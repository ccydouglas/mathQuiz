//object for questions will accept the question, choices, answer

function gameQuestion(question, choices, answer){
	this.question = question;
	this.choices = choices;
	this.answer = answer;
}
//funciton to check the answer, will return boolean value
gameQuestion.prototype.correctAnswer = function (choice){
	return choice === this.answer;
}

var randomArray = new Array(20).fill(-1);
//object to great the quiz, will accept the instant of the questions
//start with score= 0 and question index = 0
function triviaQuiz(questions){
	this.score = 0;
	this.questions = questions;
	this.numberOfQuestion = 0;
	this.gameTotal = 5;
	this.questionIndex = Math.floor(Math.random()*20);
	
}
//function to return the question index in the array
triviaQuiz.prototype.getQuestionIndex = function(){
	randomArray[this.questionIndex]=this.questionIndex;
	return this.questions[this.questionIndex];
}


//question to check if we get to the end, return boolean value
triviaQuiz.prototype.isEnded = function(){
	return this.numberOfQuestion === 5;
}

//function to calculate the score and then go the next question
triviaQuiz.prototype.guess = function(answer){
	if(this.getQuestionIndex().correctAnswer(answer)){
		this.score++;
	}
	this.questionIndex = Math.floor(Math.random()*20);
	while(randomArray[this.questionIndex] !== -1){
		 this.questionIndex = Math.floor(Math.random()*20);
	 }
	 this.numberOfQuestion++;
	 console.log(this.numberOfQuestion);
}


