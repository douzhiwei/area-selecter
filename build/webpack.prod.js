const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  mode:'production',
  entry: path.resolve(__dirname, "../src/lib/index.js"),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'area-selecter.js',
    library: 'areaSelect',
    libraryTarget: 'umd'
  },
  plugins:[
    new CleanWebpackPlugin(),
  ]
}
