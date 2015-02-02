var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.session.email) {
    res.redirect('/');
    return;
  }

  res.render('compose');
});

module.exports = router;
