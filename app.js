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

function routePage(requirePath, routePath, staticPath = "") {
  try {
    var moduleName = require(requirePath);
    if (staticPath != "") {
      app.use(express.static(path.join(__dirname, staticPath)));
    }
    app.use(routePath, moduleName);
  }
  catch (e) {
    console.log(e);
    console.log("no such module");
  }
}

// route pages
var pages = [
  {
    "path": "./pages/express-main-page/main",
    "routePath": "/",
    "staticPath": ""
  }
]

pages.forEach((item, i) => {
  routePage(item["path"], item["routePath"], item["staticPath"])
});
