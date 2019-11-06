const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const topSpeakers = await speakersService.getList();
    response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
