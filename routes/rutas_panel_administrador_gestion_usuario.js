var express = require("express");
var routerloguiado = express.Router();
var fs = require("fs");
var redis = require("redis");
var User =require("../model/user").User;
var Tarjeta =require("../model/tarjeta").tarjeta;
var Proyecto =require("../model/proyectos").proyectos;
var Tipotarea =require("../model/tipotareas").tipotarea;
var Tipousuario =require("../model/tipousuario").tipousuario;
var Tester=require("../model/tester").tester;
var Criterio=require("../model/criterios").criterios;
var Problema=require("../model/problemas").problemas;
var Trabajos =require("../model/trabajos").trabajos;

var client =redis.createClient();

routerloguiado.get("/corte",function(req,res){
			User.find({},function(err,usuarios){
					
					console.log(usuarios)
						
					res.render('administrador/listacorte',{usuarios:usuarios});
					});

});

routerloguiado.get("/cortar",function(req,res){
	
			User.find({},function(err,usuarios){
						for (var i = 0; i < usuarios.length; i++) 
						{
							User.update({_id:usuarios[i]._id}, {$set: {horaslaborales:usuarios[i].horaslaborales_estaticas}},function(err,user)
							{
								
							});
						}
						req.flash('info', 'Se realizo corte');
						res.redirect('/panel_gestion_usuario/corte');
					});

	
});


                   

routerloguiado.get("/",function(req,res){//solicitudes y respuestas
	var restador=0;	
			Trabajos.count({usuario:req.query.id}, function(err, count) 
		{		
				restador=(parseInt(count/10));
				if(restador>=2)
				{
					restador=(parseInt((restador-1)*8))
				}
		
			    Trabajos.find({usuario:req.query.id},function(err,trabajos)
				{
					
					User.findOne({_id:req.query.id},function(err,usuario){
						
						res.render('administrador/panel_horas_pagadas',{trabajos:trabajos,iduser:req.query.id,usuario:usuario});
					});
					
				}).populate("tarjeta").skip(restador);
		});
});



routerloguiado.get("/vertodos",function(req,res){//solicitudes y respuestas
			    Trabajos.find({usuario:req.query.id},function(err,trabajos)
				{
					User.findOne({_id:req.query.id},function(err,usuario){
						res.render('administrador/panel_horas_pagadas',{trabajos:trabajos,iduser:req.query.id,usuario:usuario});
					})
				}).populate("tarjeta");
});



routerloguiado.get("/mirartarjetausuarioperfil",function(req,res){//solicitudes y respuestas
		Tarjeta.findOne({_id:req.query.id},function(err,tarjetas)
	 {
	 			tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
		    			{
		    				Tester.find({tarjeta:tarjeta._id},function(err,tester)
							{
		    					Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
									{ 				
										res.render("administrador/mirartarjetausuarioperfil",{tarjetas:tarjetas,problemas:problemas,tester:tester});
									});
							}).populate("usuario");
		    			});
	 });

});



//
module.exports = routerloguiado;