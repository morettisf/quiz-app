// questions object
var questionsObject = [{
	question : "What species of grapes are most commonly made into wine?",
	answers: [
		{ text: "Vitis Vinifera", correct: true },
		{ text: "Vitis Riparia", correct: false },
		{ text: "Vitis Hudana", correct: false },
		{ text: "Vitis Formeca", correct: false }
	]
},

{    
	question : "What is the measurement of soluble solids before harvest?",
	answers: [
    	{ text: "pH", correct: false },
    	{ text: "brix", correct: true },
    	{ text: "sugar", correct: false },
    	{ text: "TA", correct: false }
  ]
},

{    
 	question : "Which will provide the best indicator of preharvest ripeness levels?",
 	answers: [
 		{ text: "Berry sampling", correct: false },
		{ text: "Cluster sampling", correct: true },
		{ text: "Tissue sampling", correct: false },
		{ text: "Weight sampling", correct: false }
  ]
},

{
	question : "Once fermentation begins, how should brix be measured?",
	answers: [
		{ text: "Refractometer", correct: false },
		{ text: "PAL", correct: false },
		{ text: "Centrifuge", correct: false },
		{ text: "Hydrometer", correct: true }
	]
},

{
	question: "How can fermentation be stopped?",
	answers: [
		{ text: "SO2 addition", correct: false },
		{ text: "Fortification", correct: false },
		{ text: "Cold temperatures", correct: false },
		{ text: "All of the above", correct: true }
	]
},

{
	question: "Before using any equipment, it must be?",
	answers: [
		{ text: "Clean", correct: false },
		{ text: "Of the best quality", correct: false },
		{ text: "Sanitized", correct: true },
		{ text: "Sterilized", correct: false }
	]
},

{	
	question : "What piece of equipment is used to rack barrels?",
	answers: [
		{ text: "Diaphram pump", correct: true },
	 	{ text: "Must pump", correct: false },
	 	{ text: "Agitator pump", correct: false },
	 	{ text: "Air pump", correct: false }
	 ]
},

{	
	question : "Ideally, when should secondary fermentation take place?",
	answers: [
		{ text: "After SO2 addition", correct: false },
		{ text: "During winter months", correct: false },
		{ text: "Before bottling", correct: false },
		{ text: "After primary fermentation", correct: true }
	]
},

{	
	question : "The purpose of topping wine is to...",
	answers: [
		{ text: "Fill up containers", correct: false },
		{ text: "Make more wine", correct: false },
		{ text: "Prevent spoilage", correct: true },
		{ text: "Blend", correct: false }
	]
},

{	
	question : "When is a wine ready to be bottled?",
	answers: [
	{ text: "Depends on the winemaking style", correct: true },
	{ text: "Before it spoils", correct: false },
	{ text: "When it tastes good", correct: false },
	{ text: "Spring", correct: false }
	]
}]

// counters
var score = 0;
var currentQuestion = 0;
var qNum = 1;

// initial button loaded to start quiz. Includes a reset for counters if user starts quiz over.
$("#start-quiz-btn").click(function(event) {
	event.preventDefault();
	score = 0;
	currentQuestion = 0;
	qNum = 1;
	$("#endScore").toggleClass("hide");
	$("#content").toggleClass("hide");
	$("#indicators").toggleClass("hide");
	$("#start-quiz-btn").addClass("hide");
	$("#score").text("");
	startQuestions();
})
	
// loads current question
function startQuestions() {
	$("#qNum").text(qNum + " of " + questionsObject.length);
	$("h2").html(questionsObject[currentQuestion].question);
	$("label[for=a1]").text(questionsObject[currentQuestion].answers[0].text);
	$("label[for=a2]").text(questionsObject[currentQuestion].answers[1].text);
	$("label[for=a3]").text(questionsObject[currentQuestion].answers[2].text);
	$("label[for=a4]").text(questionsObject[currentQuestion].answers[3].text);
	$("#quiz-btn").toggleClass("hide");
	$("correct-incorrect").html("");
}

// submit button listener for choice has been made on radio
$("#quiz-btn").click(function(event) {
	event.preventDefault();	
	var choice = $("input[name='a1']:checked").attr("value");

// if no radio is selected, display text to select an answer
	if (choice === undefined) {
		$("#correct-incorrect").html("Select an answer!");
	}

	else {
		$("#quiz-btn").toggleClass("hide");
		$("#next-btn").toggleClass("hide");
		checkAnswer(choice);
	}
	console.log(choice)
})

// checks answer to see if the value is a "true" bolean in the questions object
function checkAnswer(choice) {
	if (questionsObject[currentQuestion].answers[choice].correct === true) {
		correctAnswer();
		}
	else {
		incorrectAnswer();
	}
}

// if answer is correct, display certain elements and increase score
function correctAnswer() {
	score++;
	$("#correct-incorrect").html("Correct!");
	$("#score").text("Score: " + score + " of " + questionsObject.length);
	nextQuestion();
}

// if answer is incorrect, find and display the correct answer
function incorrectAnswer() {
	var answerText;

	for (var i = 0; i < questionsObject[currentQuestion].answers.length; i++) {
		if (questionsObject[currentQuestion].answers[i].correct === true) {
			answerText = questionsObject[currentQuestion].answers[i].text;
			break;
		}		
	}

	// display certain elements without increase in score
	$("#correct-incorrect").html("Incorrect! </br>Answer: <span id='answer'>" + answerText + "</span>");
	$("#score").text("Score: " + score + " of " + questionsObject.length);
	nextQuestion();

}

// event listener for "next" button
$("#next-btn").click(function(event) {
	event.preventDefault();
	$("#next-btn").toggleClass("hide");
	$("#correct-incorrect").html("");
	$("input[name='a1']").prop("checked", false);

	// if user is on the last question and clicks "next", the final score content appears. Allow user to restart quiz.
	if (currentQuestion === questionsObject.length) {
	//	$("#quiz-btn").toggleClass("hide");
		$("#content").toggleClass("hide");
		$("#endScore").html("<h2>Finished!</h2>You scored: " + score + " out of " + questionsObject.length);
		$("#endScore").toggleClass("hide");
		$("#start-quiz-btn").text("Start Over");
		$("#start-quiz-btn").toggleClass("hide");
		$("#indicators").toggleClass("hide");
		$("#correct-incorrect").html("");
	}

	// if not on the last question, proceed to next question
	else {
		startQuestions();
	}

})

// increase counters for which actual question to display and what question number to display 
function nextQuestion() {
	currentQuestion++;
	qNum++;
}
