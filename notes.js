// HOW NodeJS differs from VanillaJS
    // node runs on a server - not in a browser
    // the console is the terminal window. not in the browser
        console.log('hello world')
    // there is no window object. instead there is a global object
        console.log(global)

    // NodeJS has common core modules that we will explore
    // NodeJS uses commonjs modules instead of es6 modules
    
        const os = require('os')
        const path = require('path')
        const math = require('./math') //we create a separate module called math, export and require it here. note we can also destructure the functions from math.js

        console.log(math.add(1,2))

        console.log(os.type(), os.version(), os.homedir())

        console.log(__dirname) //gets us the directory name -> /home/seanbalayan/code/labs/NodeJS/node_js_resources
        console.log(__filename) //gets us the filename -> /home/seanbalayan/code/labs/NodeJS/node_js_resources/notes.js

        console.log(path.dirname(__filename)) //get us the parent directory of the current file -> /home/seanbalayan/code/labs/NodeJS/node_js_resources
        console.log(path.basename(__filename)) //gets us the specific filename -> server.js
        console.log(path.extname(__filename)) //gets the .after the file -> .js


        console.log(path.parse(__filename)) // returns an object with all of the values above
            // {
            //     root: '/',
            //     dir: '/home/seanbalayan/code/labs/NodeJS/node_js_resources',
            //     base: 'notes.js',
            //     ext: '.js',
            //     name: 'notes'
            //   }

    // NODEJS is missing some JS APIs like fetch