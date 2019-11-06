const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = params => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();

      const errors = request.session.feedback ? request.session.feedback.errors : false;
      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    '/',
    [
      check('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A name is required'),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email address is required'),
      check('title')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A title is required'),
      check('message')
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage('A message is required'),
    ],
    (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }
      return response.send('Feedback form posted');
    }
  );

  return router;
};
