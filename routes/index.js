const express = require('express');

const speakersRoute = require('./speakers');

const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    /*if (!request.session.visitcount) {
      request.session.visitcount = 0;
    }

    request.session.visitcount += 1;
    console.log(`Number of visits: ${request.session.visitcount}`);*/

    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();

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
