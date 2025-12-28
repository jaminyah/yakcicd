/*
 * create package.json: npm init --y
 * npm install --save-dev jest  // install jest for testing: 
 * reference: https://medium.com/@kanishetty/how-to-build-a-ci-cd-pipeline-from-scratch-step-by-step-guide-b3913cf3d799
 */

const express = require('express');
const { readFile } = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  readFile('./index.html', 'utf-8', (err, html) => {
      if(err){
          res.send("service currenty unavailable");
      }
      res.send(html);
  })
})

app.listen(port, () => console.log(`App running on port ${port}`));