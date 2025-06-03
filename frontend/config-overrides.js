// filepath: /c:/Users/JASPER/Desktop/Coko/Coko/frontend/config-overrides.js
const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    url: require.resolve('url'),
    process: require.resolve('process/browser'),
    https: require.resolve('https-browserify')
  };

  config.module.rules.push({
    test: /\.html$/,
    use: ['html-loader']
  });

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};