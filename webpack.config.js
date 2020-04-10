/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const production = process.env.PRODUCTION

module.exports = {
  entry: './src/index.ts',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader'
          }, {
            loader: 'awesome-typescript-loader'
          }]

      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      services: path.resolve('./src/services'),
      config: path.resolve('./src/config'),
      bean: path.resolve('./src/bean')
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/locale/**/*.po'),
      to: path.resolve(__dirname, 'build/locale/[name].po')
    }], {}),
    new webpack.DefinePlugin({
      production
    })
    // new CleanWebpackPlugin()
  ]
}
