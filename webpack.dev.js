const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    mode:'development',
    devtool:'cheap-module-eval-source-map',                   
    // output:{
    //     filename: '[name].js',
    //     chunkFilename:'[name].chunk.js'
    // },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), //再哪个文件夹下启动服务
        open:true,
        hot:true,
        port: 8060
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader','postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 2, //比如一个SASS文件，内部又import了一个B.scss文件，那么为了让B.scss文件也先走postcss 和 sass-loader
                          modules:true, //默认是false 代表当前页面import 的css只作用于当前页面
                        },
                    },
                    "sass-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    
    resolve: {
        extensions: [
          '.ts',
          '.js' // add this
        ]
      },
    //HtmlWebpackPlugin
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {}
}

module.exports = merge(commonConfig,devConfig)