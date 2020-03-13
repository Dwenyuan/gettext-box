const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'awesome-typescript-loader',
        },
        {
          loader: 'babel-loader',
        }],

      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
