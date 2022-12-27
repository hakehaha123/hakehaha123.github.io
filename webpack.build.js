const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackSubresourceIntegrity = require('webpack-subresource-integrity');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const config = require('./webpack.config');

process.env.NODE_ENV = 'production';
config.mode = 'production';

config.optimization = {
  splitChunks: { 
    chunks: 'initial',
    cacheGroups: {
      commons: {
        chunks: 'initial',
        name: 'commons',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0
      },
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  // runtimeChunk: { name: 'runtime' }
};
config.plugins.unshift(
  new CleanWebpackPlugin()
)
config.plugins.push(
  new WebpackAssetsManifest({
    integrity: true,
    integrityHashes: ['sha256', 'sha384']
  }),
  new WebpackSubresourceIntegrity({
    hashFuncNames: ['sha256', 'sha384']
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist')
      }
    ],
  })
);

module.exports = config;
