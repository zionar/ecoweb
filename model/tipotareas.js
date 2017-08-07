var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var userSchemaJSON = mongoose.Schema({
		nombre:{type:String,require:"EL nombre es obligatorio"},
});

var tipotarea = mongoose.model("tipotarea",userSchemaJSON);
module.exports.tipotarea = tipotarea;
