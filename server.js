const express = require('express');
const { request, response } = require('express');

const path = require('path');

const cookieSession = require('cookie-session');

const createError = require('http-errors');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeekersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeekersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Rahul@2016', 'Rahul@2020'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ISA HIT Branch';

//Middlewares are applied in Express
app.use(express.static(path.join(__dirname, './static')));

/*app.get('/throw', (request, response, next) => {
  setTimeout(() => {
    return next(new Error('Something did throw!'));
  }, 500);
});*/

//app.get('/speakers', (request, response) => {
// response.sendFile(path.join(__dirname, './static/speakers.html'));
//});

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});
app.listen(port, () => {
  console.log(`Express Server listening on port ${port}!`);
});
