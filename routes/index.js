const express = require("express")

const router = express.Router()

module.exports = () => {
  // routes HTTP GET requests. takes path and callback as args
  router.get('/', (req, res) => {
    // renders view from pages/index. defines local pageTitle variable of 'Welcome' for the view
    res.render('pages/index', {pageTitle: 'Welcome'})
  })

  return router
}
