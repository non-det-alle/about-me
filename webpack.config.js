const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.ts',

  output: {
    publicPath: '/about-me/',
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new CopyPlugin({ patterns: [{ from: 'src/dist/', to: './' }] }),
  ],

  module: {
    rules: [
      {
        test: /.(js)?$/,
        use: ['script-loader'],
        include: [],
        exclude: [/node_modules/]
      },
      {
        test: /.(ts|tsx)?$/,
        use: ['ts-loader'],
        include: [],
        exclude: [/node_modules/]
      },
      {
        test: /.(css)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            }
          },
          'extract-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /.(less)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'main.css',
              esModule: false,
            }
          },
          'extract-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'index.html',
            }
          },
          'extract-loader',
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"]
            }
          },
          {
            loader: '@webdiscus/pug-loader',
            options: {
              mode: 'html'
            }
          }
        ]
      },
      {
        test: /\.(svg|jpg|woff(2)?|ttf|eot)/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[hash].[ext]',
            esModule: false,
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  }
}
