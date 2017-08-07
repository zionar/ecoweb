var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var userSchemaJSON = mongoose.Schema({
		nombre:{type:String,require:"EL nombre es obligatorio"},
});

var tipousuario = mongoose.model("tipousuario",userSchemaJSON);
module.exports.tipousuario = tipousuario;
