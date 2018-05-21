const merge = require('webpack-merge');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const WebpackVisualizerPlugin=require('webpack-visualizer-plugin');
const common = require("./webpack.config.common");
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    plugins: [
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:3000/a.html'
        }),
        new WebpackVisualizerPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        historyApiFallback:true,
        proxy: {
            '/api': {
                target: 'http://10.50.95.0:7001',
                changeOrigin: true,
                secure: false
            }
        }
    }
})