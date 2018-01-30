'use strict';

// Change ENV to 'prod' to enable minify
const ENV = 'dev';

const path = require('path'),
  webpack = require('webpack');

const phaserModulePath = path.join(__dirname, '/node_modules/phaser-ce/'),
  phaserPath = path.join(phaserModulePath, 'build/custom/phaser-split.js'),
  pixiPath = path.join(phaserModulePath, 'build/custom/pixi.js'),
  p2Path = path.join(phaserModulePath, 'build/custom/p2.js');

let webpackExport = {
  entry: {
    game: path.resolve(__dirname, './app/main'),
    // optionalOtherBundle: './path/to/other/script'
  },
  
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].bundle.js',
  },
  
  module: {
    rules: [
      {
        test: /phaser\.js$/,
        use: [
          {
            loader: 'script-loader',
          },
        ],
      },
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
              name: './assets/audio/[name].[ext]?[hash]',
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
              limit: 25000,
              name: './assets/images/[name].[ext]?[hash]',
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
              limit: 65000,
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
              limit: 65000,
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
              limit: 65000,
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
              limit: 65000,
              mimetype: 'application/vnd.ms-fontobject',
              name: './assets/fonts/[name].[ext]',
            }
          },
        ],
      },
    ]
  },
  
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: pixiPath,
      p2: p2Path,
      Phaser: phaserPath,
    }),
  ],
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
    // compress: true,
    port: 3013,
  }
}

module.exports = webpackExport;
