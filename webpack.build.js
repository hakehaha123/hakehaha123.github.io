const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackSubresourceIntegrity = require('webpack-subresource-integrity');


const config = require('./webpack.config');

process.env.NODE_ENV = 'production';
config.mode = 'production';

config.optimization = {
  splitChunks: { // 打包 node_modules里的代码
    chunks: 'initial', // 只对入口文件处理
    cacheGroups: {
      commons: {
        chunks: 'initial',//打包初始时依赖第三方
        name:'commons',
        minChunks: 2,//最小共用次数
        maxInitialRequests: 5,
        minSize: 0
      },
      vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  runtimeChunk: {name:'runtime'}// 单独抽离 runtimeChunk 之后，每次打包都会生成一个runtimeChunk.xxx.js。
};

config.plugins.push(
  new WebpackAssetsManifest({
    integrity: true,
    integrityHashes: ['sha256', 'sha384']
  }),
  new WebpackSubresourceIntegrity({
    hashFuncNames: ['sha256', 'sha384']
  }),
);

module.exports = config;
