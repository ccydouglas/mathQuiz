$(document).ready(function(){
	$("#start").click(function(){
		//replace thr html code of the application first page to this code
		$("#firstPage").addClass("question1").removeClass("firstPage");
		$("#buttons").addClass("buttons").removeClass("startBtn");
		$(".grid").css("backgroundImage", "url('../images/QuestionBackground.jpg')")
		var multipleChoices = "<button id ='btn0'><span id='choice0'></button>";
		multipleChoices+="<button id ='btn1'><span id='choice1'></button>";
		multipleChoices+="<button id ='btn2'><span id='choice2'></button>";
		multipleChoices+="<button id ='btn3'><span id='choice3'></button>";
		multipleChoices+="<hr style = 'margin-top: 20px'>";
		multipleChoices+="<section class= 'result'><p id= 'progress'></p><p id='timer'>Timer: <span id='minutes'>00</span>:<span id='seconds'>00</span></p></section>";
		$("#buttons").children().remove();
		$("#buttons").append($(multipleChoices));
		//populate()to start the game by displaying the question and calculate the scores, and time
		$.populate();
		//clock() to display the countup timer
		endTime = $.clock();
	});
	
	
	//creating an array to hold the queston, choices and the correct answers
	//each element of this array is an instance of the GameQuestion object 
	var questions = [
	new gameQuestion("Ordinary table salt is sodium chloride. What is baking soda?", ["Potassium chloride", "Potassium carbonate", "Potassium hydroxide", "Sodium bicarbonate"], "Sodium bicarbonate"),
	new gameQuestion("Plants receive their nutrients mainly from?", ["chlorophyll", "atmosphere", "light", "soil"], "soil"),
	new gameQuestion("The chemical formula for water is", ["NaAlO2","H2O","	Al2O3","CaSiO3"], "H2O"),
	new gameQuestion("The hardest substance available on earth is?", ["Gold", "Iron", "Diamond", "Platinum"], "Diamond"),
	new gameQuestion("The property of a substance to absorb moisture from the air on exposure is called", ["osmosis", "deliquescence", "efflorescence","desiccation"], "deliquescence"),
	new gameQuestion("How many muscles in total do you have in all your fingers combined?", ["20", "10", "22","none"], "none"),
	new gameQuestion("Which of the following is not a gas?", ["Nitrogen", "Oxygen", "Helium","Mercury"], "Mercury"),
	new gameQuestion("The first ever commercial bungie jump took place in which country:", ["South Africa", "Australia", "New Zealand","Italy"], "New Zealand"),
	new gameQuestion("Which US city is popularly known as the 'city of the Golden Gate'?", ["Los Angeles", "Chicago", "New York City","San Francisco"], "San Francisco"),
	new gameQuestion("Where are the shores of Tripoli", ["Australia", "Libya", "Egypt","Greece"], "Libya"),
	new gameQuestion("When was the year without a summer", ["1904", "1816", "1729","1403"], "1816"),
	new gameQuestion("What is the largest country by area that has only one time zone?", ["Russia", "Turkey", "China","India"], "China"),
	new gameQuestion("How many days can a flu virus live in bills?", ["2", "8", "14","17"], "17"),
	new gameQuestion("What is the oldest and still inhabited city in North Anerica?", ["New York", "Mexico City", "Cholula","Panama City"], "Cholula"),
	new gameQuestion("How many times heart beats in a day?", ["1,000", "10,000", "100,000","1,000,000"], "100,000"),
	new gameQuestion("How many percent of the people live north of the equator?", ["90%", "70%", "80%","60%"], "90%"),
	new gameQuestion("How many squares are in normal Monopoly board?", ["80", "40", "60","20"], "40"),
	new gameQuestion("Which of these came on screen first?", ["Doctor Who", "Quntum Leap", "Star Trek","Star Wars"], "Doctor Who"),
	new gameQuestion("Which of these teams have won the more Super Bowls than the others?", ["Green Bay Packers", "Jacksonville Jaguars", "New Yourk Giants","Dallas Cowboys"], "Dallas Cowboys"),
	new gameQuestion("Which of these teams have been the English Scoccer Champions the most?", ["Liverpool", "Manchester City", "Manchester United","Chelsea"], "Manchester United")
	];

	//create an instance of object Quiz and pass the array questions as an argument
	var quiz = new triviaQuiz(questions);

	
	/*this function will check if the game is over and will show the scores and the time you spent to finish the quiz, otherwisw, will show the question "or the next question", when will check the answers by calling guess function and finally show the progress after display evry question*/
	$.populate = function(){
		if(quiz.isEnded()){
			//variables to retreive the time 
			var finalMinutes = document.getElementById("minutes").innerHTML;
			var finalSeconds = document.getElementById("seconds").innerHTML;
			//console.log(finalMinutes, finalSeconds);
			/*showScores() takes finalMinutes and finalSeconds as a parameter
			this function will calculate the score and time*/
			getScores(finalMinutes, finalSeconds);
			/*to clear the time everytime the game is ended or the page been refreshed
			*/
			clearInterval(timer);
		}
		else{
			//display the question and choices
			document.getElementById("firstPage").innerHTML = quiz.getQuestionIndex().question;
			var choices = quiz.getQuestionIndex().choices;
			for(var i = 0; i < choices.length; i++){
				document.getElementById("choice" + i).innerHTML = choices[i];
				//check the user shoice
				guess("btn"+i, choices[i]);
			}
			//display the progress of the game in the buttom of the game 
			$.showProgress();
		}
	}
	/*clock() will calculate the time and display the time in the buttom of the game */
	$.clock = function(){
        var sec = 0;
		function pad ( val ) { 
		return val > 9 ? val : "0" + val; 
		}
		timer = setInterval( function(){
        document.getElementById("seconds").innerHTML = pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
	
}
	
	//this function will display the statment that shows the progress the user is making
	$.showProgress = function(){
		var questionNumber = quiz.numberOfQuestion +1;
		document.getElementById("progress").innerHTML = "Question " + questionNumber + 
		" of " + quiz.gameTotal;
	}
	
	/*this function will check the user's answer for each question, it takes id and userChoice as a arguments
	id is the button id, userChoice is the choice in the array
	and then call the main funciton "poplate()" to display the next question if the game is not over yet */
	function guess(id, userChoice){
		document.getElementById(id).onclick = function(){
			quiz.guess(userChoice);
			$.populate();
		}
	}

	/*this function will show the score after the game is over
	it takes minutes, seconds as an arguments*/
	function getScores(minutes, seconds){
		var gameOverHtml = "<h1> Result </h1>";
		gameOverHtml += "<h3 id = 'score'> Correct answers: " + quiz.score + " out of " + quiz.gameTotal+ "</h3>";
		gameOverHtml += "<h3 id = 'score'> Your total time is "+ minutes +":"+ seconds +"</h3>";
		gameOverHtml += "<button id='startOver' value='startOver'>Start Over</button>";
		document.getElementById("quiz").innerHTML = gameOverHtml;
	}
	$(document).on("click", "#startOver", function(){
		location.reload(true);
		});
});
		

