module.exports =function(server,sessionMiddleware)
{
 var io = require("socket.io")(server);
 var redis = require("redis");
 var client =redis.createClient();
 
client.subscribe("tarjetas");
 
 io.use(function(socket,next){
 	sessionMiddleware(socket.request,socket.request.res,next);
 });

 client.on("message",function(channel,message){
  console.log("El mensaje es del canal "+channel);
  
  if(channel=="tarjetas")
  {
  	 io.emit("new tarjeta",message);
	 console.log(message);
  }
 	
 })

 io.sockets.on("connection",function(socket){
 	
 	console.log(socket.request.session.user_id);
 });

}