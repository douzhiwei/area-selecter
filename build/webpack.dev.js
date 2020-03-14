const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "../src/main.js"),
  devServer: {
    port: 8080,
    compress: true,
    contentBase: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      filename: "index.html"
    })
  ]
}
