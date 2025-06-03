const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html_coop$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('streambrowser'),
      crypto: require.resolve('cryptobrowser'),
      assert: require.resolve('assertbrowser')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'processbrowser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
};

