var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");
var email_match =[/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,"coloca un mail valido"]

var posiblesestados=["pendiente","activo","inactivo"];

var password_validation=
 {
	validator: function(p)
	{
		return this.password_confirmation == p;
	},
	message:"Las contraseñas no son iguales"
}

var userSchemaJSON = mongoose.Schema({
		username:{type:String,required:"El nick es obligatorio",maxlength:[50,"El nombre no es muy grande"]},
		password:{type:String,minlength:[8,"La contraseña debe tener minimo una longitud de 8"],validate : password_validation},
		email:{type:String,required:"El correo es obligatorio",match:email_match,unique:true},
		telefono:{type:Number,required:"El telefono es obligatorio"},
		puntos:{type:Number,required:"Obligatorio crear un usuario con puntos iniciales"},
		horaslaborales:{type:Number,required:"Obligatorio crear un usuario con horas laborales iniciales"},
	    horaslaborales_estaticas:{type:Number,required:"Obligatorio crear un usuario con horas laborales iniciales"},
	    estado:{type:String,enum:{values:posiblesestados,message:"Opcion no valida de estado"},required:"Estado Obligatorio"},
	    nivel:{type:String,required:"El Usuario es obligatorio"},
});

userSchemaJSON.plugin( uniqueValidator , {  message : ' Error, El correo {VALUE} ya existe. ' } );


userSchemaJSON.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c =password;
});

var User = mongoose.model("User",userSchemaJSON);
module.exports.User = User;
