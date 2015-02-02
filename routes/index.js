var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.email) {
    res.redirect('/inbox');
  } else {
    res.render('index');
  }
});

module.exports = router;
