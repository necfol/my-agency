const express = require('express');
const request = require('superagent');
const { PORT = '3838' } = process.env;
const { HOST } = require('./package.json').remote;
console.log(HOST)
const app = express();
app.set('port', PORT);
app.use('/', function (req, res) {
    var sreq = request.get(HOST + req.originalUrl).end((err, sres) => {
        sres.pipe(res);
      });
});
app.listen(app.get('port'), () => {
    console.log(`启动服务@${app.get('port')}`)
});