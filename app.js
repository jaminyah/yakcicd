/*
 * create package.json: npm init --y
 * npm install --save-dev jest  // install jest for testing: 
 * npm install express
 * reference: 
 * https://medium.com/@kanishetty/how-to-build-a-ci-cd-pipeline-from-scratch-step-by-step-guide-b3913cf3d799
 * 
 * Ref: https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
 * create selfsigned.key and selfsigned.crt files at the bash shell:
 * openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
 */

// Source - https://stackoverflow.com/a
// Posted by DragonFire, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-06, License - CC BY-SA 4.0

// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.jamrx.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.jamrx.me/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.jamrx.me/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use((req, res) => {
    res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
