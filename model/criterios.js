var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var estados=["aceptada","rechazada","pendiente"];

var userSchemaJSON = mongoose.Schema({
		descripcion:{type:String,require:"La descripcion es obligatoria"},
		estado:{type:String,enum:{values:estados,message:"El estado es obligatorio"}},
		tipotarea:{type:mongoose.Schema.Types.ObjectId,ref:"tipotarea",required:"requiere tipotarea"}

});

var criterios = mongoose.model("criterios",userSchemaJSON);
module.exports.criterios = criterios;
