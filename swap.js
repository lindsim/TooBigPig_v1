$(document).ready(function(){
	$('#pigface').click(swapFace);
});

	var pig = "images/pigface.png";

var swapFace = function(){
	if (pig == "images/pigface.png"){
		pig = "images/winkpig.png";
	}
	else if (pig == "images/winkpig.png"){
		pig = "images/pigface.png";
	}
	
	$(this).attr('src', pig);
}
