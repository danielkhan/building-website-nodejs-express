const express = require("express");
const path = require("path");

const app = express();

// sets port to 3000
const port = 3000;
// sets ejs to be the value of view engine
app.set('view engine', 'ejs')
// sets path to views directory as the value of views
app.set('views', path.join(__dirname, './views'))

// app.use mounts specified middleware function at the specifie path, function is executed when base of requested path matches path
// express.static serves static files, arg specifies root directory from which to serve static assets from.
app.use(express.static(path.join('./static')));

// routes HTTP GET requests. takes path and callback as args
app.get('/', (req, res) => {
  // renders view from pages/index. defines local pageTitle variable of 'Welcome' for the view
  res.render('pages/index', {pageTitle: 'Welcome'})
});

app.get('/speakers', (req, res) => {
  // transfers file at given path.
  res.sendFile(path.join(__dirname, './static/speakers.html'));
});

// binds and listens for connections on specified port
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});