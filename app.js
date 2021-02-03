const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

// set up static files
app.use(express.static(path.join(__dirname, '/global-static')));

// set up hogan express
var hogan = require('hogan-express');
app.set('layout', path.join( __dirname, '/views/base'));
app.set('view engine', 'html');
app.engine('html', hogan);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// route pages
var main = require("./pages/main/main");
app.use("/", main);

var example = require("./pages/example/example");
app.use("/example", example);
