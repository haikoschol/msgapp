var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var messages = [];

  if (!req.session.email) {
    res.redirect('/');
    return;
  }

  req.messages.findOne({'email': req.session.email}, function(err, data) {
    if (data) {
      messages = data.messages;
    }

    res.render('inbox', {messages: messages});
  });
});

module.exports = router;
