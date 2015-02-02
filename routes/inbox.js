var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.email) {
    res.render('inbox', {messages: []});
  } else {
    res.redirect('/');
  }
});

module.exports = router;
