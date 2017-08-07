$(".more").click(function (element){
	var object= $(element.target).parents("tr").children()
	$(".modal_name").text($(object[0]).text());
	$(".modal_id").text($(object[3]).text());
	$(".modal_correo").text($(object[4]).text());
	$(".modal_telefono").text($(object[5]).text());
	$(".modal_roll").text($(object[1]).text());
});