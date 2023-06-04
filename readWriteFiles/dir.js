const fs = require('fs')

// if the directory does not exist, create the new directory
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if(err) throw err
        console.log('directory created')
    })
}

// if the directory does exist, remove the directory
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if(err) throw err
        console.log('directory removed')
    })
}
