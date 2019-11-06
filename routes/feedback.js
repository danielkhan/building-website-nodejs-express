const express = require('express');

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();
      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });

  return router;
};
