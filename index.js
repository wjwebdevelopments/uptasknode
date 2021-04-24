const http = require('http');
const express = require('express');
const www = require('./www');
const app = www(express());

const server = http.createServer(app);
server.listen(
    3000,
    console.log('Server running on port 3000')
)