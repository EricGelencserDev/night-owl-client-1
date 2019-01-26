const merge = require('webpack-merge');
const common = require('./webpack-common.js');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
      historyApiFallback: true,
      proxy: {
          '/api': {
              target: 'http://localhost:3000',
              secure: false
          }
      }
  },
  externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: 'http://localhost:8080/api',
          titleId: 'C3CB'
      })
  }
 });