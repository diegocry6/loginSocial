var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario.js').Usuario;

/* GET home page. */
router.get('/', function(req, res, next) {

  var MongoClient = require('mongodb').MongoClient
      , format = require('util').format;

//connect away
  MongoClient.connect('mongodb://127.0.0.1:27017/local', function(err, db) {
    if (err) throw err;

      var collection = db.collection('usuarios');

      usuarios = [];
      exports.index = function(req, res) {
          Usuario.find({}, function(err, docs) {
            docs.forEach(function(fila) {
                usuarios.push(fila);
                console.log(usuarios);
            });
          });
      };

      /*res.render('mongodbindex', {

          usernames: usernames

      });*/
  //res.render('mongodbindex', { title: 'LoginSocial' });
});
});
module.exports = router;
