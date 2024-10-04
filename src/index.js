const server = require('http');
const express = require('express');

var app = express();

app.use(express.static('docs'))

app.get('/ping', (req, res) => {
    res.writeHead(200);
    res.end("Hello world\n");
})

app.get('/clientId', (req, res) => {
    res.json({
        clientId: process.env.CLIENT_ID || 'Cf65ef9d4495665e67da03e5993453c208149242d5ede68328b75f2bdef6ccfb4',
        scopes: encodeURIComponent(process.env.SCOPES || 'openid email'),
        webexBase: process.env.WEBEX_BASE || 'https://webexapis.com'
    });
})

server.createServer(app).listen(process.env.PORT || 3000);
