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

			Tarjeta.findOne({responsable:req.session.user_id,color:"roja",estado:'activa'},function(err,roja)
			{
				 Tarjeta.findOne({responsable:req.session.user_id,color:"naranja",estado:'activa'},function(err,naranja)
					{	
							 Tarjeta.findOne({responsable:req.session.user_id,color:"blanca",estado:'activa'},function(err,blanca)
							{
								
									Tester.findOne({usuario:req.session.user_id,estado:'activo'},function(err,tester)
								{	
									
								User.findById(req.session.user_id,function(err,user)
								{	
									
									if(tester!=null)
									{
									 	req.flash('testin', 'Advertencia: Hay testin pendientes');	
									}
									
									res.render('usuario/card_panel',{roja:roja,naranja:naranja,blanca:blanca,user:user});
								});
									
								
								});
								
								
							}).populate("proyecto");;;
				}).populate("proyecto");;
			}).populate("proyecto");;;
});


routerloguiado.get("/mostrar",function(req,res){//solicitudes y respuestas
			
			Tester.findOne({usuario:req.session.user_id,estado:'activo',color:'roja'},function(err,tarjetas)
			{	
					if(tarjetas!=null)
		    		{
		    			tarjetas.tarjeta.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
		    			{
		    				Criterio.find({tipotarea:tarjeta.tipotarea},function(err,criterios){
		    					//console.log(criterios);
		    								res.render("usuario/tester_card",{tarjeta:tarjeta, criterios:criterios});
										});				
		    				
		    			});	
		    		}
		    		else
		    		{
		    		 Tarjeta.findOne({responsable:req.session.user_id,color:"roja",estado:'activa'},function(err,tarjetas)
						{  
						    if(tarjetas==null)
					 	    { 
					
							//_____________________vamos aca_________________
							
								Tester.findOne({usuario:req.session.user_id,estado:'activo',color:'naranja'},function(err,tarjetas)
								{	
									if(tarjetas!=null)
									{
										console.log(tarjetas)
										tarjetas.tarjeta.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
										{
										Criterio.find({tipotarea:tarjeta.tipotarea},function(err,criterios){
										//console.log(criterios);
										res.render("usuario/tester_card",{tarjeta:tarjeta, criterios:criterios});
										});				
										
										});	
									}
									else
									{
										 Tarjeta.findOne({responsable:req.session.user_id,color:"naranja",estado:'activa'},function(err,tarjetas)
											{ 
												 if(tarjetas==null)
					 	    					
					 	    					{
					 	    						
																			
													Tester.findOne({usuario:req.session.user_id,estado:'activo',color:'blanca'},function(err,tarjetas)
													{	
															if(tarjetas!=null)
															{		
																	tarjetas.tarjeta.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjeta)
																	{
																			Criterio.find({tipotarea:tarjeta.tipotarea},function(err,criterios)
																			{
																				res.render("usuario/tester_card",{tarjeta:tarjeta, criterios:criterios});
																			});				
																	
																	});	
															}
															else
															{
																
																	console.log("Blanca");
																
																	 Tarjeta.findOne({responsable:req.session.user_id,color:"blanca",estado:'activa'},function(err,tarjetas)
																	{
																		
																		if(tarjetas!=null)
																		{
																		
																			tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjetas)
																			{
																				Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
																				{ 				
																					res.render("usuario/developer_card",{tarjetas:tarjetas,problemas:problemas});
																				});
																			});
																				
																		}
																		else
																		{
																			
																				req.flash('info', 'Advertencia:No hay tareas asignadas');
																					res.redirect('/tarjetas/');					
																			
																		}
																	
																		console.log(tarjetas)
																		
																	}).populate("tarjeta");;
																
																
																
															}
															
									 
													}).populate("tarjeta");
																			
				 	    						
					 	    					}
					 	    					else
					 	    					{
					 	    						
					 	    						console.log("naranja");
													if(err){res.redirect("/");return;}
													tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjetas)
													{
														Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
														{ 				
														res.render("usuario/developer_card",{tarjetas:tarjetas,problemas:problemas});
														});
													});

					 	    					}
					 	    					
											});
									}
								}).populate("tarjeta");
								
								
							}	
					 	    else
					 	    {
					 			console.log("Roja");
					 			if(err){res.redirect("/");return;}
								tarjetas.populate([{path:'proyecto'},{path:'tipotarea'},{path:'creador'},{path:'responsable'}],function(err,tarjetas)
		    						{
		    					    	Problema.find({tarjeta:tarjetas._id,estado:"pendiente"},function(err,problemas)
										{ 				
		    								res.render("usuario/developer_card",{tarjetas:tarjetas,problemas:problemas});
										});
											
											
										});
					 	    }	
						});
		    					
		    		}
					
        	}).populate("tarjeta");
});


routerloguiado.get("/editar/:id/edit",function(req,res){
 Tarjeta.findById(req.params.id,function(err,tarjeta){		
		res.render("usuario/tarjeta",{tarjeta:tarjeta});
	})
});




routerloguiado.post("/corregir",function(req,res)
{
	//res.send(req.body);

	if(req.body.corregido==undefined)
	{	req.flash('info', 'Advertencia:No se corrigió, no se han mandado datos');
		res.redirect('/tarjetas/mostrar');}
	
	else
	{
			if(typeof(req.body.corregido)=="string")
			{
				 Problema.updateOne({descripcion:req.body.corregido,tarjeta:req.body.id,estado:"pendiente"}, {$set: {estado: 'aceptada'}},function(err,problema)
				{                        
					req.flash('info', 'Se corrigio un problema');
					res.redirect('/tarjetas/mostrar');
				});
					
			}
			else
			{
				for (var i = 0; i < req.body.corregido.length; i++) 
				{
						 Problema.updateOne({descripcion:req.body.corregido[i],tarjeta:req.body.id,estado:"pendiente"}, {$set: {estado: 'aceptada'}},function(err,problema)
						{                          
							console.log(problema)
						});
				}
					req.flash('info', 'Se corrigieron varios  problemas');
					res.redirect('/tarjetas/mostrar');
			}			
	}		
	
	
});





function anexarcolball(nocumple,id,session) 
{
var problema3 = new Problema({
					descripcion:nocumple,
					tarjeta:id,
					estado:"pendiente",
					tester:session
					});

	Problema.findOne({descripcion:nocumple,tarjeta:id,estado:"pendiente"},function(err,problema)
						{	
						if(problema==null)
							 {	
								problema3.save().then(function(us)
								{	
									console.log(us);
								});
							 }
						});
}

routerloguiado.post("/testinerrores",function(req,res){

	if(req.body.nocumple==undefined )
	{
	}
	else
	{	
			if(typeof(req.body.nocumple)=="string")
			{
					

					var problema1 = new Problema({
					descripcion:req.body.nocumple,
					tarjeta:req.body.id,
					estado:"pendiente",
					tester:req.session.user_id
					});
						Problema.findOne({descripcion:req.body.nocumple,tarjeta:req.body.id,estado:"pendiente"},function(err,problema)
						{		
						
							if(problema==null)
							 {	problema1.save().then(function(us)
								{	
									console.log(us);
								});
							 }
							 
						});
			}
			else
			{
				for (var i = 0; i < req.body.nocumple.length; i++) 
				{
						anexarcolball(req.body.nocumple[i],req.body.id,req.session.user_id);
				}
				
			}
	}


	
			if(req.body.nocumple==undefined && req.body.descripcion=="")
			{req.flash('info', 'Advertencia:No se mandaron datos'); 
			res.redirect('/tarjetas/mostrar');}
	
			if(req.body.descripcion=="" )
			{
					req.flash('info', 'Datos actualizados');
						res.redirect('/tarjetas/mostrar');
						return;
			}
	

		
		var problema = new Problema({
		descripcion:req.body.descripcion,
		tarjeta:req.body.id,
		estado:"pendiente",
		tester:req.session.user_id
		});



			Problema.findOne({descripcion:req.body.nocumple,tarjeta:req.body.id,estado:"pendiente"},function(err,prob)
						{	
							
							if(prob==null)
							{
									problema.save().then(function(us)
									{	
										req.flash('info', 'Datos actualizados');
										res.redirect('/tarjetas/mostrar');
									},function(err){
										if(err)
										{
										 console.log(String(err));
										 	req.flash('info', 'Advertencia:No pudimos guardar la informacion');
											res.redirect('/tarjetas/mostrar');
										}
									});
							}
							else{ 		req.flash('info', 'Datos actualizados');
										res.redirect('/tarjetas/mostrar');
								
							}
				
						});
			
});



routerloguiado.post("/terminartarea",function(req,res){
	
	Tarjeta.findById(req.body.idtarjeta,function(err,tarjeta)
	{
		tarjeta.estado="pendiente";
		tarjeta.save().then(function(tarjeta){
		
		 Tester.update({tarjeta:tarjeta._id}, {$set: {estado: 'activo',color:tarjeta.color}},{multi: true},function(err,tester)
			{                                   
				if(err){console.log(err);}
				req.flash('info', 'Tarea  enviada');
				 res.redirect('/tarjetas');
			});	
			
		});
	});
});


routerloguiado.post("/terminartareaaceptar",function(req,res){
	
	Tarjeta.findById(req.body.idtarjeta,function(err,tarjeta)
	{
		tarjeta.estado="terminada";
		tarjeta.save().then(function(tarjeta){
		
		 Tester.update({tarjeta:tarjeta._id , usuario:req.session.user_id}, {$set: {estado: 'aceptado',color:tarjeta.color}},function(err,tester)
			{                                   
				if(err){console.log(err);}
				
				 req.flash('info', 'Tarea ACEPTADA');
				 res.redirect('/tarjetas');
			});	
			
			
		});
	});
});


routerloguiado.post("/terminartarearechazar",function(req,res){
	
	Tarjeta.findById(req.body.idtarjeta,function(err,tarjeta)
	{
		tarjeta.estado="activa";
		tarjeta.version=tarjeta.version+1.0;
		tarjeta.save().then(function(tarjeta){
		 Tester.update({tarjeta:tarjeta._id,usuario:req.session.user_id}, {$set: {estado: 'rechazado',color:tarjeta.color}},function(err,tester)
			{                                   
				if(err){console.log(err);}
					 req.flash('info', 'Tarea RECHAZADA');
				 res.redirect('/tarjetas');
			});	
			
			
		});
	});
});



routerloguiado.post("/marcar_trabajo",function(req,res){
			var hoy = new Date();
			dia = hoy.getDate(); 
			mes = hoy.getMonth();
			anio= hoy.getFullYear();
			fecha_actual = String(dia+"/"+mes+"/"+anio);
			fecha_actual = new Date(fecha_actual);

	
			var tarea = new Trabajos({
			descripcion:req.body.descripcion,
			horastrabajadas:req.body.horas,
			usuario:req.body.responsable,
			tarjeta:req.body.idtarjeta,
			fecha:fecha_actual
			});
			
		
			if(req.body.descripcion=="" || req.body.horas=="" )
			{
					req.flash('info', 'Advertencia: debe poner hora y/o descripcion');
					res.redirect('/tarjetas/mostrar');
					return;
				
			}
			
			Tarjeta.findById(req.body.idtarjeta,function(err,tarjeta){
					
					tarjeta.horasduracion=tarjeta.horasduracion-req.body.horas;
					tarjeta.save(function(error, arjeta){
						  
						tarea.save().then(function(tarea){
							console.log(tarea);
							    User.findById(req.body.responsable,function(err,usuario){
										     usuario.horaslaborales=usuario.horaslaborales-req.body.horas;
										     usuario.password_confirmation=usuario.password;
								    			usuario.save(function(error, user){
								    			
												req.flash('info', 'Datos actualizados');
												res.redirect('/tarjetas/mostrar');
													;				    				
								    			});
							    });
				
							});
						
					});
					
					if(err){console.log(String(err));
				
												req.flash('info', 'Advertencia:no pudimos guardar la informacion');
												res.redirect('/tarjetas/mostrar');}
			});
			
		},function(err)
		{if(err){console.log(String(err));
					
												req.flash('info', 'Advertencia:no pudimos guardar la informacion');
												res.redirect('/tarjetas/mostrar');}
		});
		


routerloguiado.post("/sugerircriterio",function(req,res){
	
				if(req.body.descripcion=="")
				{
					req.flash('info', 'Advertencia:No se mando criterio');
					res.redirect('/tarjetas/mostrar');
					return;
				}
	
	var Criteri = new Criterio({
		descripcion:req.body.descripcion,
		tipotarea:req.body.tipotarea,
		estado:"pendiente"
	});

	Criteri.save().then(function(us){
		console.log(us);
		req.flash('info', 'Guardamo el criterio correctamente');
		res.redirect('/tarjetas/mostrar');
		
	},function(err){
		if(err)
		{
		 console.log(String(err));
		 	req.flash('info', 'Advertencia:No pudimos guardar la informacion');
			res.redirect('/tarjetas/mostrar');
		}
	});

	
});

	 
	 
routerloguiado.post("/marcar_trabajotestin",function(req,res){
	
				var hoy = new Date();
				dia = hoy.getDate(); 
				mes = hoy.getMonth();
				anio= hoy.getFullYear();
				fecha_actual = String(dia+"/"+mes+"/"+anio);
				fecha_actual = new Date(fecha_actual);
		
				var tarea = new Trabajos({
				descripcion:"Tester: "+req.body.descripcion,
				horastrabajadas:req.body.horas,
				usuario:req.body.responsable,
				tarjeta:req.body.idtarjeta,
				fecha:fecha_actual
				});
				
			
				if(req.body.descripcion=="" || req.body.horas=="" )
				{
					req.flash('info', 'Advertencia: debe poner hora y/o descripcion');
					res.redirect('/tarjetas/mostrar');
					return;
					
				}
				
				tarea.save().then(function(tarea){
												   User.findById(req.session.user_id,function(err,usuario)
												   {
											    	usuario.horaslaborales=usuario.horaslaborales-req.body.horas;
											    	usuario.password_confirmation=usuario.password;
									    			usuario.save(function(error, user){
													req.flash('info', 'Datos Actualizados');
													res.redirect('/tarjetas/mostrar');
													});
								                   });
	
				});
	
	});
	

module.exports = routerloguiado;
