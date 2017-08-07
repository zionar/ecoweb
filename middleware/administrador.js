var User =require("../model/user").User;
module.exports = function(req,res,next){
	if(!req.session.user_id){
		res.redirect("/");
	}
	else{
		User.findOne({_id:req.session.user_id,nivel:"administrador"},function(err,user){
		if(err || user==null){
			console.log(err);
			res.redirect("/");
		}else{
			res.locals = { user:user };
			next();
		}

		});
		
	}
}