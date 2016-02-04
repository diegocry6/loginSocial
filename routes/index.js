var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LoginSocial' });
});

router.get('/loged', function(req, res, next) {
  res.render('loged', { title: 'LoginSocial' });
});

module.exports = router;
