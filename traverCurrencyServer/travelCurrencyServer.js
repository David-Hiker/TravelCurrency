// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引入配置文件
const config = require('./config'); 

// 引入文件模块
var fs = require('fs');

// 引入日志记录模块
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var logDirectory = __dirname + '/logs'

// 访问日志目录设置
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 创建按日期独立保存的日志文件
var accessLogStream = FileStreamRotator.getStream({
	filename: logDirectory + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false,
//	size: "10M"
});


// 引入JSON 数据文件
//const currency_data = require('./currency_data.json');

// 创建一个 express 实例
const app = express();

// 启用日志记录
app.use(morgan('combined',{stream: accessLogStream}));


// 在路由 /tcurrency 下，输出会话里包含汇率信息
app.use('/tcurrency', (request, response, next) => { 
    var currency_data = JSON.parse(fs.readFileSync('./currency_data.json'));
    response.json(currency_data); 
}); 

// 实现一个中间件，对于未处理的请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from Travel Currency, have fun!');
    response.end();
});

// 监听端口，等待连接
app.listen(config.serverPort);

// 输出服务器启动日志
//console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);




