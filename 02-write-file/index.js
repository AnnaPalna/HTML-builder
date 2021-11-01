const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
// const input = process.stdin 
// const output = process.stdout

const { stdin: input, stdout: output } = require('process');

const fullPath = path.join(__dirname, 'hello.txt')

let writeableStream = fs.createWriteStream(fullPath);

const rl = readline.createInterface({ input, output });
rl.write('Type your text:\n')

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.write('See you later')
        process.exit()
    }
    else {
        writeableStream.write(input + '\n')
    }
})


rl.on('close', () => {
    rl.write('See you later')
    process.exit()
})
