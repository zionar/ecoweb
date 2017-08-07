var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var posibles_valores=["activo","inactivo","rechazado","aceptado"];

var userSchemaJSON = mongoose.Schema({
		usuario:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:"requiere usuario"},
		tarjeta:{type:mongoose.Schema.Types.ObjectId,ref:"tarjeta",required:"requiere tarea"},
		estado:{type:String,enum:{values:posibles_valores,message:"Opcion no valida de estado"}},
		color:{type:String,required:"Color obligatorio"},	
		
});

var tester = mongoose.model("tester",userSchemaJSON);
module.exports.tester = tester;
