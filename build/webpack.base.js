const dev = require("./webpack.dev")
const prod = require("./webpack.prod")
const path = require("path")
const merge = require("webpack-merge")

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = env => {
  let isDev = env.development
  const base = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  }
  if (isDev) {
    return merge(base, dev)
  } else {
    return merge(base, prod)
  }
}
