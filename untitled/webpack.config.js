var webpack = require('webpack');
module.exports = {
    //2、进出口文件配置  
    entry:__dirname+'/jsproject/entry.js',//指定的入口文件,“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录  
    output: {//输出  
        path: __dirname+'/index',//输出路径  
        filename: 'bundle.js'//输出文件名  
    }
}  