// how to emit events and respond to events when they are emitted

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises // lets us do async await
const path = require('path')

// create a log events function. we need to use an async await because appendFile, writeFile, readFile, etc is async
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem)
    } catch (err) {
        console.log(err)
    }
}

module.exports = logEvents