const fs = require('fs')
const rs = fs.createReadStream('./files/lorem.text', { encoding: 'utf8' })
const ws = fs.createWriteStream('./files/new_lorem')

// listens for the data coming in from readable string
rs.on('data', (dataChunk) => {
    ws.write(dataChunk) //writes to our writeable stream and passes in the dataChunk
})

rs.pipe(ws); //does the same thing as the readable string listener above. piping is more efficient