/*
 * create package.json: npm init --y
 * npm install --save-dev jest  // install jest for testing: 
 * npm install express
 * reference: 
 * https://medium.com/@kanishetty/how-to-build-a-ci-cd-pipeline-from-scratch-step-by-step-guide-b3913cf3d799
 */

const express = require('express');
const app = express();

// map localhost to docker container port
const port = process.env.PORT || 3000;
 
// Serve static files from the 'public' directory
app.use(express.static('public'));

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
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});