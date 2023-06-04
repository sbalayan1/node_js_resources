const express = require('express')
// const { appendFile } = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()
const paths = ['^/$|/index(.html)?', '/new-page.html']

// middleware
    const date = require('date-fns')
    const cors = require('cors')

    // app.use is a common method for applying middleware to ALL of the routes we are using
        //urlencoded returns middleware that only parses urlencoded bodies where the request content-type matches the type option
        // in other words, form data: 'content-type': application/x-www-form-urlencoded'
        // essentially this middleware is for handling urlencoded data aka FORM DATA. When the form data comes in from the url, the middleware lets us pull the data out as a parameter
    app.use(express.urlencoded({
        extended: true //allows you to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
    }))

// built-in middleware for json
    // if json data is submitted, this lets us grab that data OUT of the submission
    app.use(express.json())

// built in middleware for serving static files
    // essentially this middleware routes requests for static files TO the public folder. express automatically routes all static files .css .txt .img to the /public folder!
    app.use(express.static(path.join(__dirname, '/public'))) // NOTE YOU NEED the / in the path here. 

// routes & http methods
    // express routes allow us to use regex in our routes
    // express also automatically sets the correct status code and content-type
    // express handles these routes like a waterfall
    // note the (.html)? makes the .html optional!
app.get('^/$|/index(.html)?', (req, res) => {
    // res.set('Content-Type', 'text/html')
    // res.status(200)
    // res.sendFile('./views/index.html', {root: __dirname}) // need to use sendFile instead of send. note the path must be absolute or we NEED to specify the root in our options obj
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/new-page.html', (req, res) => {
})

// route handlers
app.get('/hello(.html)?', (req, res, next) => {
    // the next argument is a function that can be used to move on to the next middleware in the stack. One way to do this is to add another function after the current function
    next() // moves on to the next middleware
}, (req, res, next) => {
    res.send('I am the next middleware function')
})

// another way to chain functions together. This is better than the approach above
const one = (req, res, next) => {
    next()
}

const two = (req, res, next) => {
    next()
}

const three = (req, res, next) => {
    res.send('finished')
}

app.get('/chain(.html)?', [one, two, three])


// default route
app.get('*', (req, res) => {
    // const uriPath = req.route.params // grabs the current route and returns an obj with the path, stack, and methods
    // if (!paths.includes(uriPath)) {
    //     res.redirect(301, '/') // 302 by default. we want this to be a 301. this tells the search engines that a page has permanently been moved
    // }

    // another approach would be to send a 404. In this case, if express finds the file, it will set the status code to 200 which is not what we want
    res.status(404) // sets the status code to 404
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    res.sendStatus(404) // Sets the response HTTP status code to statusCode and sends the registered status message as the text response body. note this alters what is sent and will replace what is displayed on the clientI
    res.end() // ends the response rpocess. This quickly ends the response without any data. Note, we don't need to use this if we are using res.send() or res.json()
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))