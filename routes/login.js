var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var query = {'email': req.body.email, 'password': req.body.password};

  req.users.findOne(query, function(err, user) {
    if (user === null) {
      res.redirect('/');
    } else {
      req.session.email = user.email;
      res.redirect('/inbox');
    }
  });
});

module.exports = router;
