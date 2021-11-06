const path = require('path');
const fs = require('fs');

async function buildPage() {
  try {
    const buildPath =  path.join(__dirname, 'project-dist')
    const indexHTMLPath = path.join(buildPath ,'index.html')
    const cssPath = path.join(__dirname, 'components')
    const templatePath = path.join(__dirname, 'template.html')
// создать директорию project-dist
          const directories = await fs.promises.readdir(__dirname, {recursive: true})

          for (const dir of directories) {
            if (dir.name === 'project-dist') {
              await fs.promises.rm(buildPath, { recursive: true});
            }
          }

    await  fs.promises.mkdir(buildPath, {recursive: true});
    // 

    const readStream = fs.createReadStream(templatePath, 'utf-8');
    const writeStream = fs.createWriteStream(indexHTMLPath);

    readStream.on('data', async (data) => {
        let template = data.toString();
        const tags = template.match(/{{.+}}/gi);
        for(const tag of tags) {
          const tagName = tag.match(/\w+/)[0];
          const component = await fs.promises.readFile(path.join(cssPath, `${tagName}.html`));
          template = template.replace(new RegExp(tag, 'g'), component.toString()); 
        }
        writeStream.write(template)
    });
    //
    createBundle();
    copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  } catch(err) {
    console.log(err);
  }
}

// создать бандл

const initialPath = path.join(__dirname, 'styles')
const resultPath = path.join(__dirname, 'project-dist')
const bundleCss = path.join(resultPath, 'style.css')


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

// копировать директорию
async function copyDir(initialPathMain, copyPathMain) {
  fs.promises.mkdir(copyPathMain, { recursive: true })

  const files = await fs.promises.readdir(initialPathMain, { withFileTypes: true});

  for (const file of files) {
      const initialPath = path.join(initialPathMain, file.name)
      const copyPath = path.join(copyPathMain, file.name)

      if (file.isFile()) {
          await fs.promises.copyFile(initialPath, copyPath)
      } else {
          await copyDir(initialPath, copyPath)
      }
  }
}

// вызов основной функции
buildPage()