var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var userSchemaJSON = mongoose.Schema({
		descripcion:{type:String,require:"EL nombre del proyecto es obligatorio"},
		tarjeta:{type:mongoose.Schema.Types.ObjectId,ref:"tarjeta",required:"requiere tarea"},
		usuario:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:"requiere usuario"},
		horastrabajadas:{type:String,require:"Se requiere horas trabajadas"},
		fecha:{type:Date,require:"La fecha es obligatoria"}
});

var trabajos = mongoose.model("trabajos",userSchemaJSON);
module.exports.trabajos = trabajos;
