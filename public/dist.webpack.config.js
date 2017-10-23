var webpack = require('webpack');
var path = require('path');

module.exports = {

  entry: {
    app: './src/main.ts',
    vendor: [
      'react',
      'redux',
      'react-redux',
      'react-dom'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  resolve : {
    extensions : ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },

  module : {
    loaders : [
      { 
        test: /\.ts(x?)$/, 
        loader: 'ts', 
        include: path.join(__dirname, 'src') 
      }
    ],

    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },

  plugins : [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],

  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: true
  },

  modulesDirectories: [
    'node_modules'
  ]
};
