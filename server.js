var express= require("express");//Libreria express
var http =require("http");//libreria de protocolos http
var session =require("express-session");
var bodyParser = require("body-parser");//Leer datos de las vistas
var RedisStore = require("connect-redis")(session);
var session_middleware = require("./middleware/session");//middleware para las secciones
var administrador_middleware = require("./middleware/administrador");//middleware para las secciones
var app = express();//guardo el objeto express en una variable
var server = http.Server(app);//se crea el servidor 
var rutas_usuario= require("./routes/rutas_usuario");
var rutas_inicio= require("./routes/rutas_inicio");
var rutas_tarjetas= require("./routes/rutas_tarjetas");
var rutas_panel_usuario= require("./routes/rutas_panel_usuario");
var rutas_panel_administrador= require("./routes/rutas_panel_administrador");
var rutas_panel_administrador_gestion_usuarios= require("./routes/rutas_panel_administrador_gestion_usuario");

var realtime = require("./realtime");
var formidable =require("express-formidable");
var fs = require("fs");
var flash = require('express-flash');
app.use(flash());
var sessionMiddleware=session({
 store: new RedisStore({}),
 secret:"SuperUltraSecretWords"
})
app.use(sessionMiddleware);
realtime(server,sessionMiddleware);

app.use(bodyParser.json());// para peticiones aplicaciones/json
app.use(bodyParser.urlencoded({extended:true}));//leer parametros 
app.use("/estatico",express.static('public')); //server archivos estaticoss
app.set("view engine","jade");//Poder usar jade

app.get("/",function(req,res){//solicitudes y respuestas
	  res.render('login');
	}); 
	
app.get("/registrar",function(req,res){//solicitudes y respuestas
	 	res.render('registrar');
	});

app.use("/users",rutas_usuario);

app.use("/inicio",administrador_middleware);
app.use("/inicio",rutas_inicio);

app.use("/panel_administrador",administrador_middleware);
app.use("/panel_administrador",rutas_panel_administrador);

app.use("/panel_gestion_usuario",administrador_middleware);
app.use("/panel_gestion_usuario",rutas_panel_administrador_gestion_usuarios);


app.use("/tarjetas",session_middleware);
app.use("/tarjetas",rutas_tarjetas);

app.use("/panel_usuario",session_middleware);
app.use("/panel_usuario",rutas_panel_usuario);

server.listen(8080);