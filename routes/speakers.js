const express = require('express');

const router = express.Router();

module.exports = params => {
   const { speakerService } = params;

   router.get('/', async (request, response, next) => {
      try {
         const speakers = await speakerService.getList();
         const artwork = await speakerService.getAllArtwork();
         return response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
      } catch (err) {
         return next(err)
      }

   });

   router.get('/:shortname', async (request, response, next) => {
      try {
         const speaker = await speakerService.getSpeaker(request.params.shortname);
         const artwork = await speakerService.getArtworkForSpeaker(request.params.shortname);
         return response.render('layout', {
            pageTitle: 'Speakers',
            template: 'speakers-detail',
            speaker,
            artwork,
         });
      } catch (err) {
         return next(err)
      }

   });

   return router;
};
