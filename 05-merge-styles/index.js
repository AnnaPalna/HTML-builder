const path = require('path');
const fs = require('fs');

const initialPath = path.join(__dirname, 'styles')
const resultPath = path.join(__dirname, 'project-dist')
const bundleCss = path.join(resultPath, 'bundle.css')


async function createBundle() {
    try {
        const files = await fs.promises.readdir(initialPath, { withFileTypes: true})

        fs.writeFile(bundleCss, '', function(err) {
            if (err) throw error;
            console.log('Данные очищены')
        })

        for (const file of files) {
            if (file.isFile() && path.parse(path.join(initialPath, file.name)).ext === '.css')  {
                //чтение из файла
                fs.readFile(path.join(initialPath, file.name), 'utf8', function(err, data) {
                    if (err) throw error;
                    fs.appendFile(bundleCss, `${data}\n`, function(err) {
                        if (err) throw error;
                        console.log('Данные записаны')
                    })
                })
            }
        }
    }

    catch(error) {
        console.log('Ошибка записи')

    }
}

createBundle()