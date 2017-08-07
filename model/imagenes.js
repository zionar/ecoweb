var mongoose = require("mongoose");
//var Schema = mongoose.Scheme;
//mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/fotos");


var img_schema = mongoose.Schema({
		title:{type:String,require:true},
		creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
		extension:{type:String,require:true}
});


var Imagen = mongoose.model("Imagen",img_schema);

 
module.exports = Imagen;
/*
String 
Number
Date
buffer
Boolean
mixed
Obejetic
Array
*/