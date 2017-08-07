var socket = io();


 socket.on("new tarjeta",function(data){
 // preserve newlines, etc - use valid JSON


data=JSON.parse(data);
var container = document.querySelector("#imagenes")
var source =document.querySelector("#image-template").innerHTML;

var template= Handlebars.compile(source);


container.innerHTML =template(data)+container.innerHTML;
  
 });

//  data=JSON.parse(data);
//  console.log(data);

// var container = document.querySelector("#imagenes")
// var source =document.querySelector("#image-template").innerHTML;

// var template= Handlebars.compile(source);

// container.innerHTML =template(data)+container.innerHTML;

// });