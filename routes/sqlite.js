var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
db = new sqlite3.Database('loginsocial.db');
session = require('express-session');

router.use(cors());

function getDatos(req, res, next) {

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
        db.all("SELECT * FROM usuarios", function(err, rows) {
            if(err)
            {
                throw err;
            }
            else
            {
                usuarios = [];

                rows.forEach(function(fila) {
                    usuarios.push(fila);
                });
                res.render('vista', { usuarios: usuarios });

            }
        });
    });
}

router.get('/', function(req, res, next) {

    if ( req.session.username ) {

        getDatos(req, res, next);

    } else {

        res.redirect('http://127.0.0.1:3000/');

    }


});

router.get('/eliminar', function(req, res, next) {

ideliminar = req.query.id;

    db.run("DELETE FROM USUARIOS WHERE ID = "+ideliminar);
    res.redirect('/sqlite');

});

router.get('/add', function(req, res, next) {

    res.render('registrar', { title: 'LoginSocial' });

});

router.post('/registrar', function(req, res) {

    db.run('INSERT INTO USUARIOS (ID,USERNAME,PASSWORD,IDPERFIL,TOKEN,NOMBREPERFIL) VALUES ('+null+',"'+req.body.username+'","'+req.body.password+'","ninguno","ninguno","ninguno");');
    res.redirect('/sqlite');

});

router.put('/', function(req, res, next) {

    campo = req.body.campo;
    valor = req.body.valor;
    id = req.body.id;

    db.run("UPDATE usuarios SET "+campo+" = '"+valor+"' WHERE id = " +id+";");
    getDatos(req, res, next);

});

router.get('/cerrarsesion', function(req, res, next) {

    req.session.destroy();
    res.redirect('http://127.0.0.1:3000/');

});



module.exports = router;
