var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;//:c :C
mongoose.connect("mongodb://localhost/ecotarjeta2");

var posibles_valores=["azul","roja","blanca","naranja"];
var estados=["pendiente","activa","inactiva","terminada","rechazada"];

var userSchemaJSON = mongoose.Schema({
		color:{type:String,enum:{values:posibles_valores,message:"Opcion no valida de color"}},
		version:{type:Number,required:"La version es obligatorio"},
		estado:{type:String,required:"El estado es obligatorio"},
		descripcion:{type:String,required:"La descripcion es obligatorio"},
		horasduracion:{type:Number,required:"Las horas decduracion es obligatorio"},
		horasduracion_estatico:{type:Number,required:"Las horas decduracion es obligatorio"},
		creador:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:"requiere creador"},
		responsable:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:"requiere responsable"},
		tipotarea:{type:mongoose.Schema.Types.ObjectId,ref:"tipotarea",required:"requiere tipotarea"},
		proyecto:{type:mongoose.Schema.Types.ObjectId,ref:"proyectos",required:"requiere proyecto"},
		plazo:{type:Date,required:"Fecha maxima de entrega es obligatoria"},
		diainicio:{type:Date,required:"Se requiere el dia de inicio de la tarjeta"},
		plazodias:{type:Number,required:"La cantidad de dias asiganadas a esta tarea son obligatorios"},
		plazodias_estatico:{type:Number,required:"La cantidad de dias_estatico asiganadas a esta tarea son obligatorios"}
});

var tarjeta = mongoose.model("tarjeta",userSchemaJSON);
module.exports.tarjeta = tarjeta;
