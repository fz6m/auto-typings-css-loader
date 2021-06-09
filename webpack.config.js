'use strict'

const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const baseDir = 'test'

module.exports = {
  entry: `./${baseDir}/index.jsx`,
  context: path.resolve(__dirname),
  output: {
    path: resolve('build'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: resolve(baseDir),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        include: resolve(baseDir),
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: './src/index.js',
            options: {
              includes: 'test',
            },
          },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true
          //   }
          // },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}
