const merge = require('webpack-merge');
const OpenBrowserWebpackPlugin=require('open-browser-webpack-plugin');
const common = require("./webpack.config");
const path=require('path');
module.exports = merge(common, {
    output:{
        publicPath:'/'
    },
    plugins:[
        new OpenBrowserWebpackPlugin({
            url:'http://localhost:3000/a.html'
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname,'./dist'),
        port:3000,
        proxy:{
            '/api':{
                target:'http://10.50.95.0:7001',
                changeOrigin:true,
                secure:false
            }
        }
    }
})