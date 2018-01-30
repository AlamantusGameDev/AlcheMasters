'use strict';

// Change ENV to 'prod' to enable minify
const ENV = 'dev';

const path = require('path'),
  webpack = require('webpack');

let webpackExport = {
  entry: {
    game: path.resolve(__dirname, './app/main'),
    // optionalOtherBundle: './path/to/other/script',
  },
  
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].bundle.js',
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(json)$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
      {
        test: /\.(mp3|wav|ogg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './assets/audio/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: './assets/images/[hash].[ext]',
            }
          },
          {
            loader: 'img-loader',
            options: {
              progressive: true,
              optimizationLevel: 5,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff',
              name: './assets/fonts/[name].[ext]',
            }
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff2',
              name: './assets/fonts/[name].[ext]',
            }
          },
        ],
      },
      {
        test: /\.[ot]tf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/octet-stream',
              name: './assets/fonts/[name].[ext]',
            }
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/vnd.ms-fontobject',
              name: './assets/fonts/[name].[ext]',
            }
          },
        ],
      },
    ]
  },
};

if (ENV === 'prod') {
  webpackExport.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['webpackJsonp'],
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  webpackExport.devtool = 'source-map';
  webpackExport.devServer = {
    contentBase: path.join(__dirname, "public"),
    publicPath: '/dist/',
    compress: true,
    port: 3013,
  }
}

module.exports = webpackExport;
