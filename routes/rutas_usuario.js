var express = require("express");
var router = express.Router();
var fs = require("fs");
var redis = require("redis");
var User =require("../model/user").User;
var Tipousuario =require("../model/tipousuario").tipousuario;


router.post("/sessions",function(req,res){//solicitudes y respuestas
	 	User.findOne({email:req.body.email.toLowerCase(),password:req.body.password},function(err,user){
	 		   
	 		  console.log(req.body.email.toLowerCase());
	 		  
			 if(user!= null){
				req.session.user_id = user._id;
				if(user.nivel=="administrador")
				 {res.redirect("/inicio/");}
				else
				{res.redirect("/tarjetas/");}
			  }
			  else
			  {
			  	console.log("No se pudo iniciar sesion");
			  	console.log(user);
			  	req.session.user_id = null;
			  	req.flash('info', 'Contraseña o cuenta erronea');
			  	res.redirect("/");
			  }
	 	})	
	});


router.get("/cerrarsession",function(req,res){//solicitudes y respuestas

				req.session.user_id = "";
				res.redirect("/");
	});



router.post("/crearusuario",function(req,res){
	
	//dicionario de datos ._.	
	 // var Tipousuari = new Tipousuario({nombre:"usuario"});
	 //Tipousuari.save().then(function(us)
	 //{
	 //	console.log("oieme zy");
	 //});
		
			var usu="usuario";
			
			if(req.body.email.toLowerCase()=="zionar@hotmail.com" || req.body.email.toLowerCase()=="leo.vega.timana@gmail.com")
			{
				var usu="administrador";
			}
			
			var user = new User({email:req.body.email.toLowerCase(),
			password:req.body.password,
			telefono:req.body.telefono,
			puntos:0,
			estado:"pendiente",
			horaslaborales:20,
			horaslaborales_estaticas:20,
			nivel:usu,
			username:req.body.username.toLowerCase(),
			password_confirmation:req.body.pas});
			
	//ORO ASI HACER TODAS	
	user.save().then(function(us){
		console.log(user);
		
			req.flash('info', 'Usuario creado');	
			res.redirect("/");
		
	},function(err){
		if(err)
		{
		 console.log(String(err));
		 	req.flash('info', 'Advertencia:Error de formulario '+err);
		 	res.redirect("/registrar");
		 	
		}
	});
	 	})

module.exports = router;