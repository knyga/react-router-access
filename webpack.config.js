const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: `${__dirname}/modules`,
  resolve: {
    root: [
      path.resolve('./modules'),
    ],
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    library: 'ReactRouterAccess',
    libraryTarget: 'umd'
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: [
          '/node_modules/',
          '**/test.js',
        ],
      },
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

}