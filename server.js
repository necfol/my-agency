const express = require('express')
const request = require('superagent')
const fs = require('fs')
const https = require('https')
const { PORT = 3838 } = process.env
const { HOST } = require('./package.json').remote
var app = []
HOST.forEach((hostItem, index) => {
    app[index] = express()
    app[index].set('port', PORT + index)
    app[index].use('/', function (req, res) {
        var sreq = request.get(HOST[index] + req.originalUrl).end((err, sres) => {
            sres.pipe(res)
        })
    })
    if(index == 1) {
        https.createServer({
        key: fs.readFileSync('privatekey.pem'),
        cert: fs.readFileSync('certificate.pem')
        }, app[index]).listen(app[index].get('port'), () => {
            console.log(`启动https服务@${app[index].get('port')}`)
        })
    } else {
        app[index].listen(app[index].get('port'), () => {
            console.log(`启动http服务@${app[index].get('port')}`)
        })
    }
    
})

// var fs = require('fs'),
//     https = require('https'),
//     express = require('express'),
//     app = express()
//     app.use(express.static('public'));
//     https.createServer({
//       key: fs.readFileSync('privatekey.pem'),
//       cert: fs.readFileSync('certificate.pem')
//     }, app).listen(8888);