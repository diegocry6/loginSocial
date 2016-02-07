var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('loginsocial.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LoginSocial' });
});

router.get('/loged', function(req, res, next) {
  res.render('loged', { title: 'LoginSocial' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);

      stmt = db.prepare("SELECT * FROM usuarios WHERE username = ? AND password = ?");
          stmt.bind(req.body.username, req.body.password);
          stmt.get(function(error, row)
          {
            if ((req.body.username) || (req.body.password)) {
              if (row) {
                res.redirect('/loged');
              } else {
                res.send("Error en las credenciales <a href='/'>Volver</a>", 200);
              }
            } else {
                res.send("Los campos no pueden estar vacios <a href='/'>Volver</a>", 200);
            }
          });
});


module.exports = router;
