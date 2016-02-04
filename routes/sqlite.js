var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database('loginsocial.db');

/* GET home page. */
router.get('/', function(req, res, next) {

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
        db.all("SELECT * FROM usuarios", function(err, rows) {
            if(err)
            {
                throw err;
            }
            else
            {
                var usuarios = [];

                rows.forEach(function(fila) {
                    usuarios.push(fila);
                });
                    res.render('vista', { usuarios: usuarios });

            }
        });
    });
});

router.get('/eliminar', function(req, res, next) {

ideliminar = req.query.id;

    db = new sqlite3.Database('loginsocial.db');
    db.run("DELETE FROM USUARIOS WHERE ID = "+ideliminar);
    res.redirect('/sqlite');

});

router.get('/add', function(req, res, next) {

    res.render('registrar', { title: 'LoginSocial' });

});




module.exports = router;
