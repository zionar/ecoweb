
$("#topic").click(function(){
	var buttons= '<button class="btn" data-dismiss="modal">Cerrar</button>'+
				 '<button class="btn" id="sugerencias">Guardar</button>';
	$(".modal-body .description_content .title_3").text("Puntos a tratar");
	$(".modal-footer").empty();
	$(".modal-footer").append(buttons)
})

$("#annotations").click(function(){
	var buttons= '<button class="btn" data-dismiss="modal">Cerrar</button>'+
				 '<button class="btn" id="anotaciones">Guardar</button>';
	$(".modal-body .description_content .title_3").text("Anotaciones");
	$(".modal-footer").empty();
	$(".modal-footer").append(buttons)
})
