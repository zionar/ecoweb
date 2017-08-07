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

var client =redis.createClient();

routerloguiado.get("/",function(req,res){//solicitudes y respuestas
		 res.render('administrador/inicio');
	});
	
routerloguiado.get("/creartarjeta",function(req,res){//solicitudes y respuestas
		
		User.find({},function(err,Users)
		{
			
		if(err){res.redirect("/");return;}
		
			Proyecto.find({},function(err,proyectos)
			{
				if(err){res.redirect("/");return;}
				
				Tipotarea.find({},function(err,tipotarea)
				{
					if(err){res.redirect("/");return;}
					res.render("administrador/creartarjeta",{Users:Users,proyectos:proyectos,tipotarea:tipotarea});
				});	
				
			});	
					
		
			});
		
	});


routerloguiado.get("/crearcriterio",function(req,res){//solicitudes y respuestas
	
		Tipotarea.find({},function(err,tipotarea)
		{
			res.render("administrador/crearcriterio",{tipotarea:tipotarea});
		});
			
	});	


routerloguiado.get("/crearproyecto",function(req,res){//solicitudes y respuestas
	res.render("administrador/crearproyecto");
	});	
	
	
	

routerloguiado.get("/creartipotarea",function(req,res){//solicitudes y respuestas
	res.render("administrador/creartipotarea");
	});	

routerloguiado.get("/creartipousuario",function(req,res){//solicitudes y respuestas
	res.render("administrador/creartipousuario");
	});	





 routerloguiado.post("/creacioncriterio",function(req,res){
	var Criteri = new Criterio({
		descripcion:req.body.descripcion,
		tipotarea:req.body.tipotarea,
		estado:"aceptada"
	});


		if(req.body.descripcion=="")
	{
		req.flash('info', "No se mandaron datos");	
		res.redirect('/inicio/crearcriterio');	
	}


	Criteri.save().then(function(us){
		console.log(us);
			req.flash('info', "Criterio creado");	
		res.redirect('/inicio/')
	},function(err){
		if(err)
		{
		 req.flash('info', "No se mandaron datos");	
			res.redirect('/inicio/crearcriterio')
		}
	});
	});








 routerloguiado.post("/creaciontipousuario",function(req,res){
	var Tipousuari = new Tipousuario({
		nombre:req.body.nombre
	});

		if(req.body.nombre=="")
	{
		req.flash('info', "No se mandaron datos");	
		res.redirect('/inicio/creartipousuario')	
	}

	Tipousuari.save().then(function(us){
		req.flash('info', "Tipo usuario creada");	
		res.redirect('/inicio/')
		
	},function(err){
		if(err)
		{
			req.flash('info', 'Error:'+err);	
			res.redirect('/inicio/creartipousuario')
		}
	});
	});


 routerloguiado.post("/creaciontipotarea",function(req,res){
 	
	var tipotare = new Tipotarea({
		nombre:req.body.nombre
	});
	
	if(req.body.nombre=="")
	{
		req.flash('info', "No se mandaron datos");	
		res.redirect('/inicio/creartipotarea')	
	}

	tipotare.save().then(function(us){
		req.flash('info', "Tipo tarea creada");	
		res.redirect('/inicio/')
	},function(err){
		if(err)
		{
		 	req.flash('info', 'Error:'+err);	
			res.redirect('/inicio/creartipotarea')
		}
	});

	});



 routerloguiado.post("/creacionproyecto",function(req,res){
 	
	var Proyect = new Proyecto({
		nombre:req.body.nombre,
		fechaentrega:req.body.fechaentrega,
		estado:"activa",
		cliente:req.body.cliente,
		descripcion:req.body.descripcion
	});
	
	if(req.body.nombre==""||  req.body.fechaentrega=="" || req.body.descripcion==""  || req.body.cliente=="")
	{	
 		req.flash('info', 'Error:Algunos datos estan sin llenar');	
		res.redirect('/inicio/crearproyecto')
	}


	Proyect.save().then(function(us){
		req.flash('info', "Proyecto creado");	
		res.redirect('/panel_administrador/')
	},function(err){
		if(err)
		{
		 	req.flash('info', 'Error:'+err);	
			res.redirect('/inicio/crearproyecto')
		}
	});

	});


 routerloguiado.post("/creaciontarjeta",function(req,res){
 	 
 
 	   
	var tarjeta = new Tarjeta({
		responsable:req.body.responsable,
		tipotarea:req.body.tipotarea,
		color:req.body.color,
		version:1,
		estado:"activa",
		creador:req.session.user_id,
		horasduracion:req.body.horasduracion,
		horasduracion_estatico:req.body.horasduracion,
		descripcion:req.body.descripcion,
		proyecto:req.body.proyecto,
		plazo:req.body.plazo,
		plazodias:req.body.plazodias,
		plazodias_estatico:req.body.plazodias,
		diainicio:req.body.diainicio
	});
    
     console.log(tarjeta);
 
	tarjeta.save().then(function(us){
		
		var primertester= new Tester({
		usuario:req.body.tester,
		tarjeta:tarjeta._id,
		estado:"inactivo",
		color:tarjeta.color
		});
		 
		primertester.save().then(function(us){
					req.flash('info', 'Tarjeta Creada exitosamente');	
					res.redirect('/inicio')
				},function(err){
				if(err)
				{
				 	req.flash('info', 'Error:'+err);	
					res.redirect('/inicio/creartarjeta')
				}
		});

			
		var variableJSON=
		{
        "id":tarjeta._id,
        "color":tarjeta.color
		}
		client.publish("tarjetas",JSON.stringify(variableJSON));
	
	},function(err){
		if(err)
		{
		 	req.flash('info', 'Error:'+err);	
			res.redirect('/inicio/creartarjeta')
		}
	});

	});

module.exports = routerloguiado;