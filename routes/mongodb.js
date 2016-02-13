var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var dbHost = 'mongodb://localhost:27017/local';
session = require('express-session');
var cors = require('cors');
router.use(cors());

    usuarioSchema = new Schema({
        name: String,
        email: String,
        username: {
            type: String,
            trim: true,
            unique: true
        },
        password: String,
        provider: String,
        providerId: String,
        providerData: {},
    });

var Usuario = mongoose.model('Usuario', usuarioSchema, "usuarios");
var db = mongoose.connection;


mongoose.connect(dbHost);

function getView(req, res, next) {

    if ( req.session.username || req.user ) {

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Connected to DB");

        });
        usuarios = [];
        Usuario.find({}, function (err, result) {
            if (err) throw err;
            result.forEach(function (fila) {
                {
                    usuarios.push(fila);
                }
            });

            res.render('mongodbindex', {usuarios: usuarios});
        });

    } else {

        res.redirect('/');

    }
}

router.get('/', function(req, res, next) {

    getView(req, res, next);

});

router.get('/eliminar', function(req, res, next) {

    ideliminar = req.query.id;

    Usuario.remove({_id:ideliminar},function(err,data){
        if(err)
            console.log(err);
    });

    res.redirect('/mongodb');

});

router.get('/add', function(req, res, next) {

    res.render('registrarmdb', { title: 'LoginSocial' });

});

router.post('/registrar', function(req, res) {

    var newUser = Usuario({
        name: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) {
        if (err) throw err;
    });
    res.redirect('/mongodb');

});

router.put('/', function(req, res, next) {

    campo = req.body.campo;
    valor = req.body.valor;
    id = req.body.id;

    User.findByIdAndUpdate(id, { campo: valor }, function(err, user) {

        if (err) throw err;

    });

    getDatos(req, res, next);

});

module.exports = router;
