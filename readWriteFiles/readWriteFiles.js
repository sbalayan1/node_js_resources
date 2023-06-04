const fs = require('fs')
const path = require('path')

// note that readFile is async. instead of using path.join, you can instead pass an entire string like './files/starter.txt'
fs.readFile(path.join(__dirname, '..', 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw Error; //according to docs, if we get an uncaught Exception, need to go ahead and catch
    console.log(data)
})

console.log('Hello....') // noteice you'll see hello FIRST before the data from our readFile

//writeFile creates a new file with the content to write
//path, content to write, callback()
fs.writeFile(path.join(__dirname, '..', 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
    if (err) throw Error
    console.log('Write complete')
})

// modifies an existing file and creates a file if it doesn't exist
fs.appendFile(path.join(__dirname, '..', 'files', 'test.txt'), 'Testing text.', (err) => {
    if (err) throw Error
    console.log('Append complete')
})

// process is available via Node. this is essentially an event listener that listens for an uncaughtException and runs the callback
process.on('uncaughtException', err => {
    console.error(`There was an unchaught error: ${error}`)
    process.exit(1)
})

// note fs also has .rename which takes two files paths and a callback as args. the first file path is the target and the second file path is what you want to rename the file to.
// fs.unlink() takes a file path and deletes the provided file
//// avoiding callback hell in NodeJs. this approach eliminates the need for an error callback

const fsPromises = require('fs').promises;
const fileOperations = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, '..', 'files', 'starter.txt'), 'utf8')
        console.log(data)
    } catch(errors) {
        console.log(errors)
    }
}

fileOperations()