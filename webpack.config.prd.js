const merge = require('webpack-merge');
const common = require("./webpack.config");
const webpack=require("webpack");
module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})