const express = require('express');
const path = require('path');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes({
  feedbackService,
  speakerService,
}));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
