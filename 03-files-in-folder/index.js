const path = require('path');
const fs = require('fs');
const toKb = 1024;

const fullPath = path.join(__dirname, 'secret-folder')

async function getFiles() {
   try {
       const files = await fs.promises.readdir(fullPath, {withFileTypes: true})
       for (const file of files) {
           if (!file.isDirectory()) {
               const fileName = path.parse(path.join(fullPath, file.name)).name
               const fileExtension = path.parse(path.join(fullPath, file.name)).ext.slice(1)

               console.log(path.parse(path.join(fullPath, file.name)))

               fs.stat(path.join(fullPath, file.name), (err, stats) => {
                   let fileSize = stats.size/toKb
                   console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`)
               })
           }
       }
   }
   catch(error) {
       console.log('It was error in getting files from directory')
   }
}

getFiles()
