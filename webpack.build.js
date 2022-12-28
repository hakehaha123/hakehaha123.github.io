const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackSubresourceIntegrity = require('webpack-subresource-integrity');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const config = require('./webpack.config');

process.env.NODE_ENV = 'production';
config.mode = 'production';
config.performance = {
  hints: false
};

config.optimization = {
  // minimizer: [
  //   new UglifyJsPlugin({
  //     cache: true,
  //     parallel: true,
  //     sourceMap: true
  //   }),
  //   new OptimizeCSSAssetsPlugin({})
  // ],
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: false,
          drop_console: true
        }
      },
      parallel: true,
      sourceMap: true,
      cache: true,
      cacheKeys: (defaultCacheKeys, file) => Object.assign({}, defaultCacheKeys, {path: file}),
    }),
    new OptimizeCSSAssetsPlugin()
  ],
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
  }
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
  }),
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(js|css)$'
    ),
    threshold: 10240,
    minRatio: 0.8
  }),
  new BundleAnalyzerPlugin()
);

module.exports = config;
