const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
   const { speakerService } = params;

   router.get('/', async (request, response) => {
      // if (!request.session.visitcount) {
      //    request.session.visitcount = 0;
      // }
      // request.session.visitcount += 1;
      // console.log(`You visited the page ${request.session.visitcount} times`);

      const topSpeakers = await speakerService.getList();

      response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
   });

   router.use('/speakers', speakersRoute(params));
   router.use('/feedback', feedbackRoute(params));

   return router;
};
