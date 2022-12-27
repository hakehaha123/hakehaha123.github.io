'use strict';
const path = require('path');
const os = require('os');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const publicPath = '';

const config = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:5].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          devMode ? {
            loader: 'style-loader',
          } :
            MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ],
              browsers: [
                '> 1%',
                'last 5 versions',
                'not ie <= 9',
                'ios >= 8',
                'android >= 4.0'
              ]
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          'vue-style-loader',
          devMode ? {
            loader: 'style-loader'
          } :
            MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: devMode
            }
          },
          {
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ],
              browsers: [
                '> 1%',
                'last 5 versions',
                'not ie <= 9',
                'ios >= 8',
                'android >= 4.0'
              ],
              sourceMap: devMode
            }
          },
          {
            loader: 'sassjs-loader'

          }
        ]
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20 * 1024,
              name: '[name].[hash:5].[ext]',
              url: false,
              outputPath: 'images'
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          // {
          //   // loader: 'babel-loader',
          //   // loader: 'happypack/loader?id=happyBabel'
          // },
          // {
          //   loader: 'ts-loader',
          // options: {
          //   appendTsSuffixTo: [/\.vue$/]
          // }
          // }
          {
            loader: 'happypack/loader?id=ts'
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    // new HappyPack({
    //   id: 'happyBabel',
    //   threadPool: happyThreadPool,
    //   loaders: [
    //     {
    //       loader: 'babel-loader'
    //     }
    //   ]
    // }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true, transpileOnly: true },
        },
      ],
    }),
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'sassjs-loader'
        }
      ]
    }),

    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:5].css',
      chunkFilename: '[id].[hash].css',
      disable: false,
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index', 'vendor', 'commons', 'manifest'],
      inject: true,
      showErrors: true,
      hash: false,
      favicon: '',
      minify: {
        caseSensitive: false,
        removeComment: true,
        collapseWhitespace: false
      }
    })
  ]
};

module.exports = config;
