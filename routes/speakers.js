const express = require('express');

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    const artwork = await speakersService.getAllArtwork();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    const artwork = await speakersService.getArtworkForSpeaker(request.params.shortname);
    response.render('layout', {
      pageTitle: 'Speakers',
      template: 'speakers-detail',
      speaker,
      artwork,
    });
  });

  return router;
};
