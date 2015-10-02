(function setUp(){
	$('#shades').hide();
	$('#mud').hide();
	$('#failpig').hide();
	$('#userGuess').hide();
	$('#submit').hide();
	$('#next').hide();var best_pig = 100;
var pig = "images/pigface.png";
var	box = 0;
var	score = 0;
	$('#quit').hide();
	$('.scoreMessage').hide();
})();

$(document).ready(function(){
	$('.gameResult').text('Let\'s play!');
	$('#start').click(newGame);
	$('#quit').click(endGame);
	$('#submit').click(scoreIt);
	$('#next').click(newPond);
});

var best_pig = 100;
var pig = "images/pigface.png";
var	box = 0;
var	score = 0;

var newGame = function(){
	if (box != 1){script
		score = 0;
		$('#failpig').hide();
	 	$('#userGuess').show();
	 	$('#quit').show();
	 	$('#submit').show();
		$('.scoreMessage').text("Score:" + score);
		$('.scoreMessage').show();
		$('#start').hide();new Firebase("https://too-big-pig-1.firebaseio.com/scores");
		$('#userGuess').val("");
		box = 1;
		newPond();
	}
};

var endGame = function() {
	box = 0;
	checkscore(score);
	$('#next').hide();
	$('#userGuess').hide();
	$('#submit').hide();
	$('#start').show();
	$('#quit').hide();
	$('#shades').hide();
	$('#mud').hide();
	$('.scoreMessage').text('Score:' + score);
};

var newPond = function(){
	$('#failpig').hide();
	$('.gameResult').hide();
	$('.gameOver').hide();
	$('#next').hide();
	$('#shades').hide();
	$('#submit').show();
	$('#userGuess').show();
	$('#userGuess').val("");
	var r = Math.round(Math.random()*(100 - 10) + 10);
	$('#mud').attr('width', ( 620 * r/100));
	$('#mud').show();
	best_pig = r;
}




var scoreIt = function() {
 	var guess = $('#userGuess').val();

	if(guess > best_pig){
		$('.gameResult').show();
		$('.gameResult').text("TOO BIG PIG!");
		$('#failpig').show()
		endGame();
		}

	else if (guess == 0){
		alert('No size zero pigs! Pig magic works from 10 to 100.  Try again.');
	}

	else if (guess < best_pig && guess > 0){
		$('.gameResult').text('The pig fits!');
		$('.gameResult').show();
		var newPoints = Math.round((1000 * (guess/best_pig)));
		score += newPoints;
		$('#submit').hide();
		$('#next').show();
		$('#shades').attr('width', (guess * 3.5));
		$('#shades').show();
		$('.scoreMessage').text("Score:" + score);
		}

	else if (guess == best_pig){
		$('.gameResult').show();
		$('.gameResult').text('Perfect pig!!!');
		score += 1500;
		$('#submit').hide();
		$('#next').show();
		$('#shades').attr('width', (guess * 3.5));
		$('#shades').show();
		$('.scoreMessage').text("Score:" + score);
		}

	else {
		alert('That pig can\'t exist. Pig magic works from 10 to 100. Try again.');
	}
}

var checkscore = function(scr) {
	var items = [];
	var ref = new Firebase("https://too-big-pig-1.firebaseio.com/scores");
	ref.orderByChild("name").once("value", function(snapshot) {
	snapshot.forEach(function(data){
		items.push([parseInt(data.val().points), data.val().name, data.val().idNum]);
	});

	function compareNumbers (a, b) {
  	return a[0] > b[0];
	}

	var itemsSort = items.sort(compareNumbers);

	if (parseInt(scr) >= itemsSort[0][0]) {
		changeScores(itemsSort[0][2], scr);
		}
	});
}



var changeScores = function(lowID, playerPoints){
		var name = prompt("Top score! That'll do pig. Enter your initials (3 characters):") +"____",
		shortName = name.substring(0,3),
		obj = {"name": shortName,
					"points": playerPoints },
		specificRef = new Firebase("https://too-big-pig-1.firebaseio.com/scores/" + lowID);
		specificRef.update(obj);
		if (confirm("Go to top score page?")) {
			location.href = "scores.html";
		}

	}
