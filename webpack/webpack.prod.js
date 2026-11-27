require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {merge} = require('webpack-merge');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_URL;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_API_URL_DEV = process.env.REACT_APP_API_URL_DEV;

const config = {
  mode: 'production',
  devServer: {
    port: 7070,
    open: true,
    compress: true,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true
  },
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Leave root-relative URLs (served from /public) as-is.
              url: {filter: url => !url.startsWith('/')}
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')()]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                loadPaths: [path.join(CURRENT_WORKING_DIR, 'node_modules')]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              publicPath: '../images',
              name: '[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              publicPath: '../fonts',
              name: '[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            comparisons: false
          },
          mangle: true,
          format: {
            comments: false,
            ascii_only: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_URL: JSON.stringify(API_URL),
        REACT_APP_API_URL: JSON.stringify(REACT_APP_API_URL),
        REACT_APP_API_URL_DEV: JSON.stringify(REACT_APP_API_URL_DEV)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, 'public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
};

module.exports = merge(common, config);
