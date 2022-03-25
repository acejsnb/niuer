const { resolve } = require('path');
const fs = require('fs');

const copyFile = (url) => {
    fs.readFile(url, (err, data) => {
        fs.writeFile(resolve(__dirname, './dist/index.d.ts'), data, err => {
            if (err) {
                console.log(`写入出现错误 ${err.toString()}`);
            } else {
                console.log('完成!');
            }
        });
    });
};

copyFile(resolve(__dirname, './src/declaration.ts'));
