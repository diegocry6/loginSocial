var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('loginsocial.db');
session = require('express-session');
var logout = require('express-passport-logout');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LoginSocial' });
});

router.get('/loged', function(req, res, next) {

    if ( req.session.username || req.user ) {

        res.render('loged', { title: 'LoginSocial' });

    } else {

        res.redirect('http://127.0.0.1:3000/');

    }


});

router.post('/', function(req, res, next) {

      stmt = db.prepare("SELECT * FROM usuarios WHERE username = ? AND password = ?");
          stmt.bind(req.body.username, req.body.password);
          stmt.get(function(error, row)
          {
            if ((req.body.username) || (req.body.password)) {
              if (row) {
                  req.session.username = req.body.username;
                  res.redirect('/loged');
              } else {
                        res.send(
                        "<div class='alert alert-danger'>"+
                        "<link rel='stylesheet' type='text/css' href='stylesheets/bootstrap.min.css' />" +
                        "<link rel='stylesheet' type='text/css' href='stylesheets/errores.css' />" +
                        "<h1>Error en las credenciales</h1><a class='btn btn-primary' href='/'>Volver</a>" +
                        "</div>"
                            , 200);
                    }
            } else {
                res.send(
                    "<div class='alert alert-danger'>"+
                    "<link rel='stylesheet' type='text/css' href='stylesheets/bootstrap.min.css' />" +
                    "<link rel='stylesheet' type='text/css' href='stylesheets/errores.css' />" +
                    "<h1>Los campos no pueden estar vacios</h1><a class='btn btn-primary' href='/'>Volver</a>" +
                    "</div>"
                    , 200);
            }
          });
});

router.get('/cerrarsesion', function(req, res, next) {


    req.session.destroy()
    req.session = null
    req.logout()
    res.redirect('/')

});

module.exports = router;
