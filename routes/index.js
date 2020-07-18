const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (request, response) => {
        response.render('pages/index', { pageTitle: 'Welcome' });
    });
    return router;
};