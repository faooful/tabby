const webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WriteFilePlugin = require('write-file-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin')
const sourceRoot = path.join(__dirname, 'src')
const isProduction = process.env.NODE_ENV === 'production'

const productionEntry = {
  popup: [path.join(sourceRoot, 'js', 'popup.js')],
  home: [path.join(sourceRoot, 'js', 'home.js')]
}

const devServerEntries = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server'
]

const developmentEntry = {
  popup: [
    ...devServerEntries,
    path.join(sourceRoot, 'popupIndex.js')
  ],
  home: [
    ...devServerEntries,
    path.join(sourceRoot, 'homeIndex.js')
  ]
}

const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourceRoot, 'popup.html'),
    filename: 'popup.html',
    chunks: ['popup']
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourceRoot, 'home.html'),
    filename: 'home.html',
    chunks: ['home']
  }),
  new WriteFilePlugin(),
  new CopyWebpackPlugin([
    { from: 'manifest.json' },
    { from: 'icon.png' }
  ])
]

const developmentPlugins = [
  ...commonPlugins,
  new webpack.HotModuleReplacementPlugin()
]

const productionPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.ExtendedAPIPlugin(),
  ...commonPlugins,
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: isProduction ? productionEntry : developmentEntry,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: sourceRoot
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        include: sourceRoot
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[local]---[hash:base64:5]!postcss-loader',
        include: sourceRoot
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'src': sourceRoot,
      'environment-config': path.join(__dirname, 'src/config', process.env.NODE_ENV)
    }
  },
  plugins: isProduction ? productionPlugins : developmentPlugins,
  postcss: () => [
    require('postcss-import')({
      addDependencyTo: webpack
    }),
    require('postcss-each'),
    require('postcss-url')(),
    require('postcss-image-set'),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          preserve: true
        }
      }
    }),
    require('postcss-ungroup-selector')
  ]
}
