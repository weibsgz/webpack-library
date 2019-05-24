const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode:'production',
    entry:'./src/test.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'library.js',
        library:'library',    //可通过script 引入  通过library.方法
        libraryTarget:'umd'   //amd,commonjs环境都可以正常被引入
    },
    externals:{
        jquery:'$'  //外部文件引入lodash的名字也必须是lodash import lodash from 'lodash'
    }, //忽略lodash不要打包进去 因为外部文件已经引入了lodash
    module: {
        rules: [
            {
              test: /\.js$/, 
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader'            
              }
            }
          ]
    },

    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {             
              ie8: true            
            }
        })]
    },
   
}