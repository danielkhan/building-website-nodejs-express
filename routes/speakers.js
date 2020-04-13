const express = require('express');

const router = express.Router();

module.exports = params => {
   const { speakerService } = params;

   router.get('/', async (request, response) => {
      const speakers = await speakerService.getList();
      const artwork = await speakerService.getAllArtwork();
      response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
   });

   router.get('/:shortname', async (request, response) => {
      const speaker = await speakerService.getSpeaker(request.params.shortname);
      const artwork = await speakerService.getArtworkForSpeaker(request.params.shortname);
      response.render('layout', {
         pageTitle: 'Speakers',
         template: 'speakers-detail',
         speaker,
         artwork,
      });
   });

   return router;
};
