const path = require('path');
const fs = require('fs');
const fullPath = path.join(__dirname, 'secret-folder')

async function getFiles() {
   try {
       const files = await fs.promises.readdir(fullPath, {withFileTypes: true})
       for (const file of files) {
           if (!file.isDirectory()) {
               const fileName = path.parse(path.join(fullPath, file.name)).name
               const fileExtension = path.parse(path.join(fullPath, file.name)).ext.slice(1)

               fs.stat(path.join(fullPath, file.name), (err, stats) => {
                   console.log(`${fileName} - ${fileExtension} - ${stats.size}b`)
               })
           }
       }
   }
   catch(error) {
       console.log('It was error in getting files from directory')
   }
}

getFiles()
