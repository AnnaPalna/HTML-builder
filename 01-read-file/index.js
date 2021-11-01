const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, 'text.txt')

const readableStream = fs.createReadStream(fullPath, 'utf8')
readableStream.on('data', (data) => {
    console.log(data.toString())
})