var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var estados=["aceptada","pendiente"];

var userSchemaJSON = mongoose.Schema({
		descripcion:{type:String,require:"La descripcion es obligatoria"},
		estado:{type:String,enum:{values:estados,message:"El estado es obligatorio"}},
		tarjeta:{type:mongoose.Schema.Types.ObjectId,ref:"tarjeta",required:"requiere tarea"},
		tester:{type:mongoose.Schema.Types.ObjectId,ref:"tester",required:"requiere tester"}
});

var problemas = mongoose.model("problema",userSchemaJSON);
module.exports.problemas = problemas;
