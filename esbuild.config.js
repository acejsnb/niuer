const esbuild = require('esbuild');
const { name, version, author, license } = require('./package.json');
const TimeFn = require('./get_time');

// 输出文件添加注释
const banner = `/**
* @${name} v${version}
* (c) 2021-2022 ${author}
* Released under the ${license} License.
* ${TimeFn()}
*/`;

esbuild.buildSync({
    entryPoints: ['./src/index.ts'],
    // outdir: 'dist',
    outfile: './dist/index.js',
    bundle: true,
    format: 'esm',
    minify: true,
    // target: ['es2020','chrome58','firefox57','safari11','edge16','node12']
    // target: ['chrome58']
    banner: {
        js: banner
    }
});
