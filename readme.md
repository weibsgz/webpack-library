针对库文件打包 兼容IE8
2019.5.21日 - by wei.bin


### npm run dev 开发环境



### npm run build  生产环境



1. 不能使用import 语法 ，必须使用module.exports语法

2. 内置JQUERY 需要require('jquery')使用，但不会把jquery打包进你的库文件 外部使用的页面需要提前引入jquery,这样的目的是避免重复引用jquery这种库文件

3. 因为IE8 不支持base64 所以增加雪碧图插件 雪碧图放入src/img/sprite

