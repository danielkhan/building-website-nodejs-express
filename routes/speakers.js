const express = require('express');

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortname', async (request, response) => {
    const speaker = await speakersService.getSpeaker(request.params.shortname);
    console.log(speaker);
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speaker });
  });

  return router;
};
