require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')

require('./css/a.scss')
require('./sprite/sprite2x.css')
require('./sprite/sprite.css')

var $ = require('jquery')
var methods = require('./methods')

// import $ from 'jquery'
// import * as methods from './methods'



class TestIE8 {
    constructor(id) {
        $("#" + id).html('this is jquery!!!')
        $("#section2").text(methods.add(1,4))

        var obj = {
            a:2,
            b:2
        }
        
        console.log(Object.assign({},obj,{c:4}))

        let arr = [3,2,3]
        let obj1 = Array.from(new Set(arr))
        console.log(obj1)
        $("#section3").text(methods.testES6(arr))
        $("#section4").text(`字符串模板拼接${arr}`)
    }

}

module.exports.TestIE8 = TestIE8
// new TestIE8('testJQ')
