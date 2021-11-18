const express = require("express");
const path = require("path");

// reads indexjs file in routes directory
const routes = require('./routes')

const app = express();

// sets port to 3000
const port = 3000;
// sets ejs to be the value of view engine
app.set('view engine', 'ejs')
// sets path to views directory as the value of views
app.set('views', path.join(__dirname, './views'));

// app.use mounts specified middleware function at the specifie path, function is executed when base of requested path matches path
// express.static serves static files, arg specifies root directory from which to serve static assets from.
app.use(express.static(path.join('./static')));

app.use('/', routes());

// binds and listens for connections on specified port
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});