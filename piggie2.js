$(document).ready(function(){
	$('#submit').click(pigApp.checkGuess);
	$('#next').click(pigApp.newPond);
	$('#quit').click(pigApp.quitGame);
	$('#start').click(pigApp.startGame);
	pigApp.startGame();
});


var pigApp = (function (){
	//private variables and functions
 	var best_pig, mudWidth, genPig;
	genPig = function(){
		best_pig = Math.round(Math.random()*(100 - 10) + 10),
		mudWidth = (620 * best_pig/100);
	}

	return {
		//public variables myPublicVar: "foo",
		score: 0,
		resultText: "Let\'s play!",

		startGame: function (){
		 	$('#userGuess').show();
		 	$('#quit').show();
		 	$('#submit').show();
			$('.scoreMessage').text("Score:" + this.score);
			$('#start').hide();
			$('.gameOver').hide();
			$('#failpig').hide();
			this.newPond();
		},

		newPond: function(){
			console.log("newPond");
			genPig();
			$('.gameResult').hide();
			$('#next').hide();
			$('#shades').hide();
			$('#submit').show();
			$('#userGuess').show();
			$('#userGuess').val("");
			$('#mud').attr('width', mudWidth);
			$('#mud').show();

		},
		checkScore: function() {
			console.log("checkScore");
			var items = [],
				ref = new Firebase("https://too-big-pig-1.firebaseio.com/scores");
			ref.orderByChild("name").once("value", function(snapshot) {
			snapshot.forEach(function(data){
				items.push([parseInt(data.val().points), data.val().name, data.val().idNum]);
			});

			function compareNumbers (a, b) {
				return a[0] > b[0];
			}

			var itemsSort = items.sort(compareNumbers);

			if (parseInt(this.score) >= itemsSort[0][0]) {
				this.changeScores(itemsSort[0][2], this.score);
				}
			});
		},

		scoreIt: function (){
			console.log("scoreIt");
			var guess = $('#userGuess').val();
			$('#submit').hide();
			$('#next').show();
			$('#shades').attr('width', (guess * 3.5));
			$('#shades').show();

			if (guess == best_pig){
				$('.gameResult').show();
				$('.gameResult').text('Perfect pig!!!');
				this.score += 1500;
				//$('.scoreMessage').text("Score:" + score);
				 	}
			else {
				$('.gameResult').text('The pig fits!');
				$('.game.Result').show();
				this.score += Math.round((1000 * (guess/best_pig)));
					//$('.scoreMessage').text("Score:" + score);
				}

			},

		quitGame: function (){
			console.log("quitGame");
			//this.checkScore();
			$('#next').hide();
			$('#userGuess').hide();
			$('#submit').hide();
			$('#start').show();
			$('#shades').hide();
			$('#mud').hide();
			$('#quit').hide();
			$('#start').show();
			$('.scoreMessage').text('Score:' + this.score);
			this.checkScore();
		},

		checkGuess: function (){
			console.log("checkGuess");
			var self = this;
			var guess = $('#userGuess').val();
			console.log(guess);
			console.log(self);
			if(guess > best_pig){
				$('#failpig').show();
				$('.gameResult').show();
				$('.gameResult').text("TOO BIG PIG!");
				self.quitGame();
			}
			else if (guess > 0 && guess <= best_pig){
				self.scoreIt();
			}
			else {
				alert('That pig can\'t exist. Pig magic works from 10 to 100. Try again.');
			}

		},




		changeScores: function(lowID, playerPoints){
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
		};
})();
