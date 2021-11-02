const { promises: fs } = require('fs');
const path = require('path');

async function copyDir(initialPathMain, copyPathMain) {
    await fs.mkdir(copyPathMain, { recursive: true })

    const files = await fs.readdir(initialPathMain, { withFileTypes: true});

    for (const file of files) {
        const initialPath = path.join(initialPathMain, file.name)
        const copyPath = path.join(copyPathMain, file.name)

        if (file.isFile()) {
            await fs.copyFile(initialPath, copyPath)
        } else {
            await copyDir(initialPath, copyPath)
        }
    }
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));