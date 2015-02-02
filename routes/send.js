var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log(JSON.stringify(res.body));
  var recipient = req.body.recipient,
      msg = {sender: req.session.email, body: req.body.body};

  if (!req.session.email) {
    res.redirect('/');
    return;
  }

  req.messages.update(
    {email: recipient},
    {'$push': {messages: msg}},
    {upsert: true},
    function() {
      res.redirect('/inbox')
    }
  );
});

module.exports = router;
