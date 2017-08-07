// color to open card

$(document).ready(function(){
	if(typeof(priority) != "undefined"){
		color_priority(priority);
	}
	else{
		color_priority(0);
	}
});


function color_priority(priority){
	if(priority == 3){
		$(".content").css("background","#008");
 		$(".content").css("color","#FFF");
	}
	else if(priority == 2){
		$(".content").css("background","#F00");
 		$(".content").css("color","#FFF");
	}
	else if(priority == 1){
		$(".content").css("background","#F70");
 		$(".content").css("color","#FFF");
	}
	else{
 		$(".content").css("background","#FFF");
 		$(".content").css("color","#006");
	}
};