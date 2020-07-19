const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
    router.get('/', (request, response) => {
        response.render('layout', { pageTitle: 'Welcome', template: '' });
    });

    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));
    
    return router;
};