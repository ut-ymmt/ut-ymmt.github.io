let path = require('path');
let glob = require('glob');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = path.resolve(__dirname, 'src/');

const jsCompileFolders = ['js'];
const js_targets = glob.sync(`${basePath}/+(${jsCompileFolders.join('|')})/*.js`);
const cssCompileFolders = ['pc','mob'];
const css_targets = glob.sync(`${basePath}/scss/+(${cssCompileFolders.join('|')})/*.scss`);

const js_entries = {};
const css_entries = {};

js_targets.forEach(value => {
  const re = new RegExp(`${basePath}/`);
  const key = value.replace(re, '');
  js_entries[key] = value;
});

css_targets.forEach(value => {
  const re = new RegExp(`${basePath}/`);
  const key = value.replace(re, '');
  css_entries[key] = value;
});


module.exports = [{
  entry: js_entries,
  output: {
    filename: 'bundle.js',
    publicPath: '/js/', 
    path: path.resolve(__dirname, 'dist/js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: "jquery"
    })
  ],
  devServer: {
    contentBase: './',
    inline: true,
    hot: true
  }
},
{
  entry: css_entries,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/scss/', 
    filename: '[name].css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
];
