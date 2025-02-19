'use strict';

var webpack = require('webpack');
var fs = require('fs');
var Config = require('./hosting_config');
var banner = fs.readFileSync('./src/core/pusher-licence.js', 'utf8')
banner = banner.replace("<VERSION>", Config.version);

module.exports = {
  mode: process.env.MODE || "production",
  entry: {
    pusher: "./src/core/index",
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
    // add runtimes for easier importing of isomorphic runtime modules
    modules: ['src', 'src/runtimes', 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({banner:  banner, raw: true}),
    new webpack.DefinePlugin({
      "VERSION": JSON.stringify(Config.version),
      "CDN_HTTP": JSON.stringify(Config.cdn_http),
      "CDN_HTTPS": JSON.stringify(Config.cdn_https),
      "DEPENDENCY_SUFFIX": JSON.stringify(Config.dependency_suffix)
    })
  ]
}
