//game counter variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
//trivia array of questions set objects
var trivia = [
    {
        question: "<hr>What is the capital of Morocco?<hr>" ,
        options: ["Rabat", "Marrakech", "Casablanca", "Essaouira"],
        answer: 0,
        image: "assets/images/rabat-kasbah.jpg",
        funFact: "French Montana, the popular rapper, was born in Rabat!",
    },
    {
        question: "<hr>Since 1976, this Southeast Asian city has been officially known as Ho Chi Minh City. What was it previously named?<hr>",
        options: ["Bombay", "Saigon", "Siam", "Peking"],
        answer: 1,
        image: "assets/images/saigon.jpg",
        funFact: "The popular noodle soup, Pho, is eaten for breakfast and lunch almost every day by local residents.",
    },
    {
        question: "<hr>What is the capital of Slovenia?<hr>" , 
        options: ["Zagreb", "Sarajevo", "Bratislava", "Ljubljana"],
        answer: 3,
        image: "assets/images/ljubljana.jpg",
        funFact: "The symbol of Ljubljana is the dragon, which comes from the popular story of Jason, of Greek mythology, who slayed the dragon and freed the people from its tyranny.",
    },
    {
        question: "<hr>Which Indian state is known for its hippie beach vibes and party scene?<hr>" ,
        options: ["Uttar Pradesh", "Goa", "Maharashtra", "Karnataka"],
        answer: 1,
        image: "assets/images/Palolem_beach.jpg",
        funFact: "Unlike most places throughout the rest of India, it's fairly common the eat beef in Goa. That's due to the large Catholic community.",
    },
    {
        question: "<hr>Originally from the northern French city of Amiens, who is the current President of France?<hr>" ,
        options: ["Marine Le Pen", "Emmanuel Macron", "Nicolas Sarkozy", "Jacques Chirac"],
        answer: 1,
        image: "assets/images/macron.jpg",
        funFact: "When Macron was a high-schooler, he had an affair with his teacher. The two later married.",
    },
    {
        question: "<hr>Which of these is not an official language of Morocco?<hr>",
        options: ["Arabic", "French", "Amazigh", "None of the above"],
        answer: 1,
        image: "assets/images/marrakech-market.jpg",
        funFact: "While Arabic & Amazigh are the official languages of Morocco, many Moroccans fluently speak French and even Spanish.",
    },
    {
        question: "<hr>The prestigious <em>ballon d’or</em> is awarded to the soccer player deemed to have performed the best over the previous year. What is the English translation of ballon d’or?<hr>" ,
        options: ["Golden Boot", "Golden Award", "Golden Ball", "Golden Balloon"],
        answer: 2,
        image: "assets/images/platini-balldon-dor.jpg",
        funFact: "Germany and the Netherlands have the most ballon d'or awards, with seven players for each country receiving the honor.",
    },
    {
        question: "<hr>What is the name of Spanish football club Real Madrid’s stadium?<hr>" ,
        options: ["Camp Nou", "Santiago Bernabéu", "Wanda Metropolitano","Stade Olympique" ],
        answer: 1,
        image: "assets/images/estadio-bernebau.jpg",
        funFact: "Due to the club's early success, the Spanish king deemed them royal, and added the word 'real' to the club's name along with the crown on their emblem.",
    },
    {
        question: "<hr>Which state is the leading producer of sweet potatoes in the United States?<hr>" ,
        options: ["North Carolina", "Idaho", "Georgia", "Iowa"],
        answer: 0,
        image: "assets/images/sweet-potatoes.jpg",
        funFact: "Other important crops include tobacco, cotton, corn, soybeans, and peanuts.",
    },
    {
        question: "<hr>What is the home of the Taj Mahal and former capital of India?<hr>" ,
        options: ["Delhi", "Bombay", "Agra", "Varanasi"],
        answer: 2,
        image: "assets/images/taj-mahal.jpg",
        funFact: "Mughal Shah Jahan was first inspired to build the Taj Mahal after his third wife, Mumtaz Mahal, died while giving birth to their 14th child.",
    },
];

var quizLength = trivia.length;
var questionCount = 0 ;
var rightAnswerIndex ;
var answer ;
var rightAnswerPic ; 
var rightAnswerFact ;
var number ;
var intervalID ;
var clockRunning = false;

//function to start quiz from landing page
$(document).ready(function() {
   var click2Start = $("#emptySpan").html($("<img src='./assets/images/geography.jpg'>"));
   click2Start.attr("id", "geoStock");
    $("#geoStock").append($("<h3 id='clickText' style='text-align:center'>Click image to start!</h3>"));
    $("img").on("click", function() {
        gameLoop();
    })
})

//timer functions
function run () {
    if (!clockRunning) {
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }
}
function stop() {
    clearInterval(intervalId);
    intervalID = null;
    clockRunning = false;
}
function decrement() {
    number--;
    $("#show-number").html("<p>Time Remaining: " + number + " seconds</p>");
    if ( number === 0 ) {
        console.log("time's up!");
        unanswered++;
        showTimeout();   
    };
}
//here's what happens when the clock hits zero
function showTimeout () {
    stop(); 
    questionCount++
    $("#triviaSpan").html("Time's Up! The answer is: " + answer);
    $("#triviaSpan").append("<img class='answerPic' src=" + answerPic + ">");
    $("#triviaSpan").append("<p>" + answerFact + "</p>");
    setTimeout(gameLoop, 1000);
}
//looping through the trivia object without using for is tricky
function gameLoop () {
    run();
    if (questionCount < quizLength) {
        number = 10;
        rightAnswerIndex = trivia[questionCount].answer;
        answer = trivia[questionCount].options[rightAnswerIndex];
        answerPic = trivia[questionCount].image;
        answerFact = trivia[questionCount].funFact;
        $("#geoStock").html(trivia[questionCount].question);
        $("#geoStock").append("<a>" + trivia[questionCount].options.join("</a><br><a>") + "</a>" + "<hr>");
        $("a").attr("class", "answer-option");
    }
    else {
        $("#triviaSpan").empty();
        howYaDid();
    }
    if (number === 0) {
        showTimeout();
    }
    $("#triviaSpan").empty();
}

    //after you've gone through all questions here's what happens
    function howYaDid() {
        stop();
        $("#show-number").empty();
        $(".content-div").html("<hr><h3>Your Results</h3><hr>");
        $(".content-div").append(    
            "<p>Correct: " + correct + "</p>" + 
            "<p>Incorrect: " + incorrect + "</p>" + 
            "<p>Unanswered: " + unanswered + "</p><hr>");
        var resetText = $("<div>");
        resetText.text("Congrats! You finished. Wish you could try again? Yeahhh...me too.")
        $(".content-div").append(resetText);  

        //this is my attempt to refresh the quiz without reloading the page

        // $(resetText).on("click", function () {
        //     correct = 0;
        //     incorrect = 0;
        //     unanswered = 0;
        //     quizLength = trivia.length;
        //     questionCount = 0 ;
        //     rightAnswerIndex = "" ;
        //     answer = "" ;
        //     rightAnswerPic = "" ; 
        //     rightAnswerFact = "" ;
        //     number = "" ;
        //     intervalID = "" ;
        //     // $(".content-div").empty();
        //     gameLoop(questionCount);
        // })
    }

function showRight () {
    stop(); 
    questionCount++
    $("#triviaSpan").html("Correct! The answer is: " + answer);
    $("#triviaSpan").append("<img class='answerPic' src=" + answerPic + ">");
    $("#triviaSpan").append("<p>" + answerFact + "</p>");
    setTimeout(gameLoop, 1000);
}

function showWrong () {
    stop(); 
    questionCount++;
    $("#triviaSpan").html("Wrong! The answer is: " + answer);
    $("#triviaSpan").append("<img class='answerPic' src=" + answerPic + ">");
    $("#triviaSpan").append("<p>" + answerFact + "</p>");
    setTimeout(gameLoop, 1000);
}


$(document).on("click", ".answer-option", function() {

    if ($(this).text() == answer) {
        console.log("yay!");
        correct++;
        showRight();
    }
    else {
        console.log("wrong!");
        incorrect++;
        showWrong();
    }
});






