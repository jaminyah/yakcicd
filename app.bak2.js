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

const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

// map localhost to docker container port
const port = process.env.PORT || 3000;

/*
var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};
*/

// Certificate
const privateKey = fs.readFileSync(__dirname + '/etc/letsencrypt/live/www.jamrx.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync(__dirname + '/etc/letsencrypt/live/www.jamrx.me/cert.pem', 'utf8');
const ca = fs.readFileSync(__dirname + '/etc/letsencrypt/live/www.jamrx.me/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
 
// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// error handling
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    next();
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

var server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});