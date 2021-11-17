const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      if (!request.session.visitcount) {
        request.session.visitcount = 0;
      }
      request.session.visitcount += 1;
      console.log(`Number of Visits: ${request.session.visitcount}`);
      // console.log(topSpeakers);
      // request.session.visitcount = null;
      const topSpeakers = await speakersService.getList();
      const artwork = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
