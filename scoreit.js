
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
