const express = require('express');
const request = require('superagent');
const { PORT = 3838 } = process.env;
const { HOST } = require('./package.json').remote;
var app = [];
HOST.forEach((hostItem, index) => {
    app[index] = express();
    app[index].set('port', PORT + index);
    app[index].use('/', function (req, res) {
        var sreq = request.get(HOST[index] + req.originalUrl).end((err, sres) => {
            sres.pipe(res);
        });
    });
    app[index].listen(app[index].get('port'), () => {
        console.log(`启动服务@${app[index].get('port')}`)
    });
})