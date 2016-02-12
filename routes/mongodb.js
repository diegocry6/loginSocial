var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var dbHost = 'mongodb://localhost:27017/local';

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

router.get('/', function(req, res, next) {

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(){
        console.log("Connected to DB");

    });
    usuarios = [];
        Usuario.find({},function(err, result){
            if ( err ) throw err;
            result.forEach(function(fila) {
            {
                usuarios.push(fila);
            }
        });

    res.render('mongodbindex', { usuarios: usuarios });
        });
});

module.exports = router;
