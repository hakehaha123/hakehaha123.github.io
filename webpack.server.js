const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');

const config = require('./webpack.config');

process.env.NODE_ENV='development';
config.mode = 'development';
config.devtool='cheap-module-eval-source-map';

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
);


const addressObj = {
    ip: getLocalIPAdress(),
    port: 8080
};

new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    overlay: {
        errors: true
    },
    compress: false,
})
    .listen(addressObj.port,addressObj.ip,function (error) {
    error&&console.log(error);
    let address=`http://${addressObj.ip}:${addressObj.port}`;
    open(address);
    console.log('listening at:'+address)
});

function getLocalIPAdress () {
    var interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}
