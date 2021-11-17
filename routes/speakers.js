const express = require('express');
const SpeakerService = require('../services/SpeakerService');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
      const artwork = await speakersService.getAllArtwork();
      //console.log(artwork);
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const { shortname } = request.params;
      const speaker = await speakersService.getSpeaker(shortname);
      const artwork = await speakersService.getArtworkForSpeaker(shortname);
      //console.log(speaker);
      //console.log(artwork);
      return response.render('layout', {
        pageTitle: shortname,
        template: 'speakerDetail',
        speaker,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
