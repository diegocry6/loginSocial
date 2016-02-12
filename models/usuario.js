var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({
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

var usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
    Usuario: Usuario
};