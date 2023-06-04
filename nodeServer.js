const http = require('http') //http is a common core module
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./event_emitter')
const EventEmitter = require('events') //events is a common core module
class Emitter extends EventEmitter { } // this format is from documentation. can't just create a new EventEmitter instance

// initialize object
const myEmitter = new Emitter()

// add listener for the log event
myEmitter.on('log', (message, fileName) => logEvents(message, fileName)) // .on lets us listen for an event. this listens for the 'log' event
    // setTimeout(() => {
    //     //emit event
    //     myEmitter.emit('log', 'Log event emitted') // when the log event fires, emit 'Log event emitted'
    // }, 2000)

const PORT = process.env.PORT || 3000
const serveFile = async (filePath, contentType, res) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf-8': '' // this is done so that we don't specify utf-8 if the content-type includes an image. utf-8 does not allow for images
        )
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData
        res.writeHead(
            filePath.includes('404.html') ? 400 : 200, 
            { 'Content-Type': contentType }
        )
        res.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )
    } catch(error) {
        console.log(error)
        myEmitter.emit('log', `${error.name}\t${error.message}`, 'errLog.txt')
        res.statusCode = 500
        res.end()
    }
}
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    // when the server instance is created, we will emit when a log event fires. The message passed will include the request url and method and will log to the reqLog.txt. 
    // Note we added a fileName to our logEvents method to allow us to pass reqLog.txt in our emitter.
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt') 

    // the below creates a potential path and response to the path. is inefficient.
        // let filePath

        // if (req.url === "/" || req.url === 'index.html') {
        //     res.statusCode = 200
        //     res.setHeader('Content-Type', 'text/html')
        //     filePath = path.join(__dirname, 'views', 'index.html')
        //     fs.readFile(filePath, 'utf-8', (err, data) => {
        //         res.end(data)
        //     })
        // }

    const extension = path.extname(req.url) // extracts the extension from the request url
    let contentType;

    // sets the content type based on the extension
    switch(extension) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.jpg':
            contentType = 'image/jpeg'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.txt':
            contentType = 'plain/txt'
            break
        default:
            contentType = 'text/html'
            break
    }

    // chained ternary statements
    let filePath =
        contentType === 'text/html' && req.url === "/" ?
            path.join(__dirname, 'views', 'index.html')
        :   contentType === 'text/html' && req.url.slice(-1) === "/" ?
                path.join(__dirname, 'views', req.url, index.html) // lets us select a subdirectory within the views directory
            :   contentType === "text/html" ?
                    path.join(__dirname, 'views', req.url)
                :   path.join(__dirname, req.url)

    // makes the .html extension not requried in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html'
    const fileExists = fs.existsSync(filePath)
    if (fileExists) {
        // serve file
        serveFile(filePath, contentType, res)
    } else {
        // 404
        // 301 redirect
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'})
                res.end()
                break
            case 'www-page.html':
                res.writeHead(301, {'Location': '/'})
                res.end()
                break
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), contentType, res )
                break
        }
    }
})

server.listen(PORT, () => {console.log(`Server running on PORT: ${PORT}`)})