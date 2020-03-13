const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    new CleanWebpackPlugin()
  ]
}
