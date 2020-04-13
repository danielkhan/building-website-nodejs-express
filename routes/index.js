const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
   const { speakerService } = params;

   router.get('/', async (request, response, next) => {
      // if (!request.session.visitcount) {
      //    request.session.visitcount = 0;
      // }
      // request.session.visitcount += 1;
      // console.log(`You visited the page ${request.session.visitcount} times`);

      try {
         // throw new Error('Error in index route')

         const topSpeakers = await speakerService.getList();
         const artwork = await speakerService.getAllArtwork();
         return response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, artwork });
      } catch (err) {
         return next(err)
      }

   });

   router.use('/speakers', speakersRoute(params));
   router.use('/feedback', feedbackRoute(params));

   return router;
};
