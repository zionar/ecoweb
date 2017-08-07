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

var client =redis.createClient();

routerloguiado.get("/",function(req,res){//solicitudes y respuestas
			Proyecto.find({},function(err,proyectos)
			{	
				 res.render('administrador/projects_panel',{proyectos:proyectos});
			});
});


routerloguiado.get("/editarusuario",function(req,res){//solicitudes y respuestas
 User.findOne({_id:req.query.id},function(err,user)
			{
			     res.render('administrador/edit_profile',{user:user}); 
			})
});



routerloguiado.get("/cambiardatos",function(req,res){//solicitudes y respuestas
   	 
   	 if( req.query.username == "" ||  req.query.email == "" || req.query.telefono == ""  || req.query.horas == "" || req.query.nivel == "" ) 
   	 	  {  req.flash('info', 'Advertencia:No dejar campos vacios');
					res.redirect('/panel_administrador/editarusuario?id='+req.query.id);
					return
   	 	  }
   	 if(req.query.email=="zionar@hotmail.com" || req.query.email=="leo.vega.timana@gmail.com")
   	 {
   	 	req.query.nivel="administrador";
   	 }
   	 
   	 User.update({_id:req.query.id}, {$set: {username: req.query.username,email: req.query.email,telefono:req.query.telefono,horaslaborales_estaticas:req.query.horas,nivel:req.query.nivel}},function(err,user)
			{                                   
				if(err){console.log(err);
				    req.flash('info', 'Advertencia:Ese correo ya esta registrado');
					res.redirect('/panel_administrador/editarusuario?id='+req.query.id);
					return
				}
					req.flash('info', 'Datos actualizados');
					res.redirect('/panel_administrador/perfilusuario?id='+req.query.id)
			});	
});



routerloguiado.get("/cambiarcontra",function(req,res){//solicitudes y respuestas
			     res.render('administrador/change_pass',{id:req.query.id}); 
});

routerloguiado.get("/editarcontra",function(req,res){//solicitudes y respuestas

   	  User.findOne({_id:req.query.id},function(err,user)
			{
				  if(req.query.nueva1=="" || req.query.nueva2=="")
			         {
			        			req.flash('info', 'Advertencia:No dejar campos vacios');
							res.redirect('/panel_administrador/cambiarcontra?id='+req.query.id);
							return;
			         }

			
			   
			        if(req.query.nueva1==req.query.nueva2)
			         {
                      	 User.update({_id:req.query.id}, {$set: {password: req.query.nueva1}},function(err,user)
                    			{                                   
                    				if(err){console.log(err);
                    				    	res.send("Error");
                    				    return;
                    				}
									req.flash('info', 'Contraseña cambiada con exito');
									res.redirect('/panel_administrador/perfilusuario?id='+req.query.id)
                    			});	
			         }
			         else
			         {
			         		req.flash('info', 'Advertencia:Las contraseñas no coinciden');
							res.redirect('/panel_administrador/cambiarcontra?id='+req.query.id);
			         }
			        
			    
		
			})
});



routerloguiado.get("/perfil",function(req,res){//solicitudes y respuestas
			Proyecto.findOne({_id:req.query.id},function(err,proyecto)
			{	
				 res.render('administrador/profile',{proyecto:proyecto});
			});
});


routerloguiado.get("/perfilusuario",function(req,res){//solicitudes y respuestas
			User.findOne({_id:req.query.id},function(err,user)
			{	
				 res.render('administrador/profileuser',{user:user});
			});
});






function redirecttarjetas(id,res)
{
		Tarjeta.find({proyecto:id,color:'roja',estado:'activa'},function(err,rojas)
			{
				Tarjeta.find({proyecto:id,color:'naranja',estado:'activa'},function(err,naranjas)
				{
					Tarjeta.find({proyecto:id,color:'blanca',estado:'activa'},function(err,blancas)
					{	
							Tarjeta.find({proyecto:id,color:'roja',estado:'terminada'},function(err,rojast)
							{
								Tarjeta.find({proyecto:id,color:'naranja',estado:'terminada'},function(err,naranjast)
								{
									Tarjeta.find({proyecto:id,color:'blanca',estado:'terminada'},function(err,blancast)
									{	
									 	res.render('administrador/tarjetas',{rojas:rojas,naranjas:naranjas,blancas:blancas,rojast:rojast,naranjast:naranjast,blancast:blancast});
									}).populate('responsable');;
								}).populate('responsable');;
							}).populate('responsable');;
					}).populate('responsable');;
				}).populate('responsable');;
			}).populate('responsable');	
}

function redirecttarjetasusuario(id,res)
{
		Tarjeta.find({responsable:id,color:'roja',estado:'activa'},function(err,rojas)
			{
				Tarjeta.find({responsable:id,color:'naranja',estado:'activa'},function(err,naranjas)
				{
					Tarjeta.find({responsable:id,color:'blanca',estado:'activa'},function(err,blancas)
					{	
							Tarjeta.find({responsable:id,color:'roja',estado:'terminada'},function(err,rojast)
							{
								Tarjeta.find({responsable:id,color:'naranja',estado:'terminada'},function(err,naranjast)
								{
									Tarjeta.find({responsable:id,color:'blanca',estado:'terminada'},function(err,blancast)
									{	
									 	res.render('administrador/tarjetasusuario',{rojas:rojas,naranjas:naranjas,blancas:blancas,rojast:rojast,naranjast:naranjast,blancast:blancast});
									}).populate('responsable');;
								}).populate('responsable');;
							}).populate('responsable');;
					}).populate('responsable');;
				}).populate('responsable');;
			}).populate('responsable');	
}



routerloguiado.get("/vertarjetas",function(req,res){//solicitudes y respuestas
		redirecttarjetas(req.query.id,res);
});



routerloguiado.get("/tarjetasusuario",function(req,res){//solicitudes y respuestas
		redirecttarjetasusuario(req.query.id,res);
});


routerloguiado.get("/mirarproyecto",function(req,res){//solicitudes y respuestas
			Proyecto.findOne({_id:req.query.id},function(err,proyecto)
			{	
				 res.render('administrador/mirarproyecto',{proyecto:proyecto});
			});
});


routerloguiado.post("/editarproyecto",function(req,res){//solicitudes y respuestas
		
			if(req.body.id=="" || req.body.nombre=="" || req.body.cliente=="" || req.body.descripcion=="")
			{
				 req.flash('info', 'Advertencia:No se pudo guardar la informacion');
				 res.redirect('/panel_administrador');	
				return
			}
			
		 Proyecto.update({_id:req.body.id}, {$set: {nombre: req.body.nombre,cliente:req.body.cliente,descripcion:req.body.descripcion}},function(err,tester)
			{                                   
				if(err){console.log(err);}
				 req.flash('info', 'Proyecto modificado');
				 res.redirect('/panel_administrador/');
			});	
});


routerloguiado.get("/editarprioridad",function(req,res){//solicitudes y respuestas
	 Tarjeta.update({_id:req.query.id}, {$set: {color: req.query.color}},function(err,tester)
			{ 
				  
				 req.flash('info', 'Se edito la prioridad de una tarjeta');
				 redirecttarjetas(req.query.idp,res);		 
			});
});

routerloguiado.get("/editarprioridadusuario",function(req,res){//solicitudes y respuestas
	 
	 Tarjeta.update({_id:req.query.id}, {$set: {color: req.query.color}},function(err,tester)
			{ 
				 req.flash('info', 'Se edito la prioridad de una tarjeta');
				 redirecttarjetasusuario(req.query.idp,res);		 
			});
});

routerloguiado.get("/mirar",function(req,res){//solicitudes y respuestas
		Tarjeta.findOne({_id:req.query.id},function(err,tarjetas)
	 {
	 			tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
		    			{
		    				Tester.find({tarjeta:tarjeta._id},function(err,tester)
							{
		    					Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
									{ 				
										res.render("administrador/mirartarjeta",{tarjetas:tarjetas,problemas:problemas,tester:tester});
									});
							}).populate("usuario");
		    			});
	 });

});


routerloguiado.get("/mirartarjetausuario",function(req,res){//solicitudes y respuestas
		Tarjeta.findOne({_id:req.query.id},function(err,tarjetas)
	 {
	 			tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
		    			{
		    				Tester.find({tarjeta:tarjeta._id},function(err,tester)
							{
		    					Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
									{ 				
										res.render("administrador/mirartarjetausuario",{tarjetas:tarjetas,problemas:problemas,tester:tester});
									});
							}).populate("usuario");
		    			});
	 });

});






routerloguiado.get("/usuarios",function(req,res){//solicitudes y respuestas
	
		User.find({},function(err,usuarios)
		{
			 res.render('administrador/usuarios_panel',{usuarios:usuarios});
		});
});


module.exports = routerloguiado;