// This is the smallest and fastest version of the project I could build
// using fs, path, lodash and pure javascript running in nodejs
// Cicero - 15 May 2022
import fs from 'fs';
import path from 'path';
import _ from "lodash";
(async () => {
    fs.readdir('./input/', {}, (err, filenames) => {
        filenames.filter(i => i.includes('csv'))?.forEach(filename => {
            const output = [];
            const file = fs.readFileSync(`./input/${filename}`, { encoding: 'utf8' })?.split(/\r?\n/);
            const structure = file?.[0]?.replace(/_/g, '.')?.split(',');
            file?.splice(1)?.forEach(line => {
                const lineObj = {};
                structure.forEach((field, index) => _.set(lineObj, field, line?.split(',')?.[index]));
                output.push(lineObj);
            })
            fs.writeFile(`./output/${path.parse(filename).name}.json`, JSON.stringify(output), (err) => err && console.error(err));
        })
    })
})();

