var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var userSchemaJSON = mongoose.Schema({
		nombre:{type:String,require:"EL nombre del proyecto es obligatorio"},
		fechaentrega:{type:Date,required:"La fecha es obligatoria"},
		estado:{type:String,required:"El estado es obligatorio"},
		descripcion:{type:String,required:"La descripcion es obligatorio"},
		cliente:{type:String,required:"El cliente es requerido"}
});

var proyectos = mongoose.model("proyectos",userSchemaJSON);
module.exports.proyectos = proyectos;
