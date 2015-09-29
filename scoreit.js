(function listScores (){
	var ref = new Firebase("https://too-big-pig-1.firebaseio.com/scores"),
		items = [],
		display = [];

	ref.orderByChild("name").once("value", function(snapshot) {
		snapshot.forEach(function(data){
			items.push([data.val().points, data.val().name]);
	});

	var itemsSort = items.sort(compareNumbers);

	for (var x = 0; x < 10; x++){
		display.push("<li>" + itemsSort[x][1] + "....." + itemsSort[x][0] + "</li>");
	}
		$(".ordered").append(display.join(''));

	});
})();


function compareNumbers (a, b) {
  return a[0] < b[0];
}




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
