const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const baseConfig = {
    entry: {
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', 'less', 'css']
        // alias:{
        //     jquery$:path.resolve(__dirname,'src/common/libs/jquery.min.js')
        // }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-cssnext')(),
                                // require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    "less-loader"
                ]
            }]
    },
    optimization: {
        runtimeChunk: {
            name:'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name][hash].css'
        })
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // })
    ]
}

const generatePage = ({title = '', entry = '', template = './src/index.html', name = '', chunks = []}) => {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html'
            })
        ]
    }

}

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        name: 'a',
        chunks: ['jquery', 'a']
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        name: 'b',
        chunks: ['jquery', 'b']
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        name: 'c',
        chunks: ['jquery', 'c']
    })
]

// module.exports = pages.map(page => {
//     return merge(baseConfig, page);
// })
module.exports = merge([baseConfig].concat(pages))