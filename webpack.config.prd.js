const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const common = require("./webpack.config");
const webpack=require("webpack");
module.exports = merge(common, {
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})