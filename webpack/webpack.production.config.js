const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    target: 'web',
    entry: {
        'bundle': [
            './app/src/index.jsx'
        ]
    },
    context: resolve(__dirname, '../'),
    output: {
        path: resolve(__dirname, './../dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            'DEBUG': false,
            '__DEVTOOLS__': false
        }),
        new ExtractTextPlugin({
            filename: '../dist/main.css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
                drop_debugger: true,
                global_defs: {
                    __REACT_HOT_LOADER__: undefined
                }
            },
            minimize: true,
            debug: false,
            sourceMap: true,
            output: {
                comments: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: resolve(__dirname, './../app/src')
            },
            {
                test: /\.scss$/i,
                include: resolve(__dirname, '../app/stylesheets'),
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    }
};