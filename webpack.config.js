let path = require('path');
let glob = require("glob");

const jsBasePath = path.resolve(__dirname, 'src/');
const jsCompileFolders = ['js'];
const targets = glob.sync(`${jsBasePath}/+(${jsCompileFolders.join('|')})/*.js`);

const entries = {};
targets.forEach(value => {
  const re = new RegExp(`${jsBasePath}/`);
  const key = value.replace(re, '');
  entries[key] = value;
});


module.exports = {
  entry: entries,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  }
};
