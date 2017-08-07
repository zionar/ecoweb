var express = require("express");
var routerloguiado = express.Router();
var fs = require("fs");
var redis = require("redis");
var User =require("../model/user").User;
var Tarjeta =require("../model/tarjeta").tarjeta;
var Trabajos =require("../model/trabajos").trabajos;
var Tester=require("../model/tester").tester;
var Tipotarea =require("../model/tipotareas").tipotarea;
var Criterio=require("../model/criterios").criterios;
var Problema=require("../model/problemas").problemas;


routerloguiado.get("/",function(req,res){//solicitudes y respuestas
 User.findOne({_id:req.session.user_id},function(err,user)
			{
			     res.render('usuario/profile',{user:user}); 
			});
});


routerloguiado.get("/editar",function(req,res){//solicitudes y respuestas
 User.findOne({_id:req.session.user_id},function(err,user)
			{
			     res.render('usuario/edit_profile',{user:user}); 
			})
});


routerloguiado.post("/cambiardatos",function(req,res){//solicitudes y respuestas
   	 
   	 if( req.body.username == "" ||  req.body.email == "" || req.body.telefono == "") 
   	 	  {  req.flash('info', 'Advertencia:No se permiten campos nulos');
					res.redirect('/panel_usuario/editar')
					return
   	 	  }
   	 
   	 User.update({_id:req.session.user_id}, {$set: {username: req.body.username,email: req.body.email,telefono:req.body.telefono}},function(err,user)
			{                                   
				if(err){console.log(err);
				    req.flash('info', 'Advertencia:Ese correo ya esta registrado');
					res.redirect('/panel_usuario/editar')
					return
				}
				req.flash('info', 'Datos Actualizados');
				res.redirect('/panel_usuario/')
			});	
});


routerloguiado.get("/cambiarcontra",function(req,res){//solicitudes y respuestas

			     res.render('usuario/change_pass'); 
});


routerloguiado.post("/mirar",function(req,res){//solicitudes y respuestas
		Tarjeta.findOne({_id:req.body.id},function(err,tarjetas)
	 {
	 	
	 			tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
		    			{
		    				Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
														{ 				
														res.render("usuario/mirar",{tarjetas:tarjetas,problemas:problemas});
														})			
		    				
		    			});
	 });

});




routerloguiado.post("/editarcontra",function(req,res){//solicitudes y respuestas
   	 
   	  User.findOne({_id:req.session.user_id},function(err,user)
			{
			    
			    if(req.body.actual==user.password)
			    {
			        if(req.body.nueva1==req.body.nueva2)
			         {
			            
                      	 User.update({_id:req.session.user_id}, {$set: {password: req.body.nueva1}},function(err,user)
                    			{                                   
                    				if(err){console.log(err);
                    				    	res.send("Error");
                    				    return;
                    				}
									req.flash('info', 'Contraseña cambiada con exito');
									res.redirect('/panel_usuario/')
                    			});	
			         }
			         else
			         {
			         		req.flash('info', 'Advertencia:Las contraseñas no coinciden');
							res.redirect('/panel_usuario/cambiarcontra');
			         }
			        
			    }
			    else
			    {
			       req.flash('info', 'Advertencia:Esa no es su contraseña actual');
							res.redirect('/panel_usuario/cambiarcontra');
			    }
			    
			})
});


	// req.flash('info', 'Advertencia:No pudimos guardar la informacion');
	// 										res.redirect('/tarjetas/mostrar');

module.exports = routerloguiado;
