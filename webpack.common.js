const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const formatCssTemplate = function (data) {
  var str = '';
  for (let item of data.sprites) {
    str += `.icon-${item.name}{
      background-image: url('${item.image}');
      background-position: ${parseFloat(item.offset_x) / 2}px ${parseFloat(item.offset_y) / 2}px;
      background-size: ${parseFloat(item.total_width) / 2}px ${parseFloat(item.total_height) / 2}px;
      width: ${parseFloat(item.width) / 2}px ;
      height: ${parseFloat(item.height) / 2}px;
    }\n`
  }
  return str;
};

const formatCssTemplateIE8 = function (data) {
  var str = '';
  for (let item of data.sprites) {
    str += `.icon-${item.name}{
      background-image: url('${item.image}') \\\9;
      background-position: ${parseFloat(item.offset_x)}px ${parseFloat(item.offset_y)}px \9;     
      width: ${parseFloat(item.width)}px \\\9;
      height: ${parseFloat(item.height)}px \\\9;
    }\n`
  }
  return str;
};



module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library',    //可通过script 引入  通过library.方法
    libraryTarget: 'umd'   //amd,commonjs环境都可以正常被引入
  },
  externals: {
    jquery: '$'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
              limit: 1   //2048 // 2KB以下用URL-LOADER转成BASE64，為了兼容IE8 不轉了
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
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

  //HtmlWebpackPlugin
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head'
    }),
    // //设置每一次build之前先删除dist  
    new CleanWebpackPlugin(),

    //雪碧图
    //雪碧图
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/img/sprite"),
        glob: "*1x.png"
      },
      target: {
        image: path.resolve(__dirname, "src/sprite/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "src/sprite/sprite.css"),
            { format: "format_css_templateIE8" }
          ]
        ]
      },
      customTemplates: {
        format_css_templateIE8: formatCssTemplateIE8
      },
      apiOptions: {
        cssImageRef: "sprite.png"
      }
    }),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/img/sprite"),
        glob: "*2x.png"
      },
      target: {
        image: path.resolve(__dirname, "src/sprite/sprite2x.png"),
        css: [
          [
            path.resolve(__dirname, "src/sprite/sprite2x.css"),
            { format: "format_css_template" }
          ]
        ]
      },
      customTemplates: {
        format_css_template: formatCssTemplate
      },
      apiOptions: {
        cssImageRef: "sprite2x.png"
      }
    })
  ]
}