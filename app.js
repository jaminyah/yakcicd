/*
 * create package.json: npm init --y
 * npm install --save-dev jest  // install jest for testing: 
 * reference: https://medium.com/@kanishetty/how-to-build-a-ci-cd-pipeline-from-scratch-step-by-step-guide-b3913cf3d799
 */

const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello CI/CD!"));
app.listen(3000, () => console.log("App running on port 3000"));