//This is Douglas Chan's Assignemnt
$(document).ready(function(){


	$("#submit").hide();
	$("#ans").hide();
	$("#output").hide();

	$(".button").click(function() {
		$(this).css("background-color","grey");
	});

// to slide down and up the instructions
    $("#flip").click(function(){
        $("#panel").slideDown();
    });

    $("#panel").click(function(){
    $("#panel").slideUp(1000);
    });
     });





// timer below
// set the time to 60 seconds
var time= 60;

function timer(){
	if(time>0){
		document.getElementById('time').value=time;
		time=time-1;
		var gameTimer= setTimeout("timer()",1000)		
	}else if (time==0) {

		document.getElementById('time').value=time;
		//appears the finish statement on the screen
		document.getElementById('finish').innerText="TIMES UP! you got "+ point+ " points.\n Hit 'New Game' to restart";

//when times up, fade out the below elements 
		$("#question").fadeOut(1000);
		$("#submit").fadeOut(1000);
		$("#easy").fadeOut(1000);
		$("#hard").fadeOut(1000);
		$("#time").fadeOut(1000);
		$("#ans").fadeOut(1000);
		$("#second").fadeOut(1000);
		$("#output").fadeOut(1000);

		$("#finish").css("font-size","30px");

	}

}


// below is math game
var correctAnswer;
var point=0;
var level;

//generate random number 
function randnum(min,max){
	var num=Math.round(Math.random()*(max-min))+min;
	return num;
}

// if the user select easy level, it will go to this function
function easy() {
	//this if statement is to prevent the user change game level during the game
	if (time<59&&time!==0) {
		alert("You already started, you cannot change difficulty levels now. You will need to start a new game.")
	}else if(time==0){
	time=60;
	timer();
	game(100);
	level=100;
	$("#submit").show();
	$("#ans").show();
	}else{
		//triger the timer function and the game function to start the game
	timer();
	game(100);
	level=100;
	$("#submit").show();
	$("#ans").show();
	}
}

	

// if the user select easy level, it will go to this function
function hard(){
	//this if statement is to prevent the user change game level during the game
	if (time<59) {
		alert("You already started, cannot change difficulties now")
	}else if(time==0){
	time=60;
	timer();
	game(100);
	level=100;
	$("#submit").show();
	$("#ans").show();
	}else{
		//triger the timer function and the game function to start the game
	timer();
	game(1000);
	level=1000;
	$("#submit").show();
	$("#ans").show();
	}
}

//this is the main game function
function game(level) {
	//first it will clear the previous questions on the screen
	document.getElementById('question').innerText="  ";

	//generate a number between 1-4
	var a= randnum(1,4);
	var oper;
	var str="";
	// if the number is 1, it will be a "+" question 
	if (a==1) {
		oper="+";
		var num1= randnum(0,level);
		var num2= randnum(0,level);
		correctAnswer=num1+num2;

		//display the question on the screen
		document.getElementById('question').append(num1+oper+num2);
	}

	// if the number is 2, it will be a "-" question 
	if (a==2){
		oper="-";
		var num1= randnum(0,level);
		var num2= randnum(0,level);
		correctAnswer=num1-num2;
//display the question on the screen
		document.getElementById('question').append(num1+oper+num2);
	}

	// if the number is 3, it will be a "*" question 
	if (a==3){
		oper="*";
		var num1= randnum(0,level);
		var num2= randnum(0,level);
		correctAnswer=num1*num2;
//display the question on the screen
		document.getElementById('question').append(num1+oper+num2);
	}

	// if the number is 4, it will be a "/" question 
	if (a==4) {
		oper="/";
		var num1= randnum(0,level);
		var num2= Math.round(randnum(0,level)/10);

		correctAnswer= Math.round(num1/num2);
//display the question on the screen
		document.getElementById('question').append(num1+oper+num2);
	}
}

// this function is to check the answer
function checkAnswer() {
	var answer= document.getElementById("ans").value;
	if(correctAnswer==answer){
//if the answer is correct, add 5 points
		point+=5;

		document.getElementById('output').value=("Correct! you got 5 points. Your total point:"+point);

		$("#question").css("color","#3CBC8D");

		$("#output").css("background-color","#3CBC8D");

		$("#output").css("opacity","0.6");

		$("#output").show();

		game(level);

		document.getElementById('ans').value="";

	}else{
//if the answer is incorrect, deducts 5 points
		point-=5;
		document.getElementById('output').value=("Inorrect! Correct Answer is " + correctAnswer +" Your point: "+point);
		  $("#question").css("color","red");
		  $("#output").css("background-color","red");
		  $("#output").css("opacity","0.6");
		  $("#output").show();

		game(level);
		document.getElementById('ans').value="";
	}


}
//below function is to prompt user their name and appear on the top of the screen
function name() {
	 var userName= prompt("What is your name?");
	 document.getElementById('welcome').innerText="Hello "+userName+" welcome to the Math Quiz!";
}






