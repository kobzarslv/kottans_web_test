    
$(document).ready(function(){
    
    var totalQuestions = 0,
    correctAnswers = 0,
    answerLength = 0;
    playerAnswer = [];
    questionFromSer = [],
    question = {
        "id":"",
        "question":"",
        "answer":"",
        "category":""
    };
        
    $("#start_button, #next_button").on("click",function(){
        $("#answer_correct, #answer_incorrect, #next_button").removeClass("visible");
        $("#start_button").text("Skip");
        questionFromServer();
    }); 

    
    $("#quiz_letters").on("click","p",function(){
        $(this).appendTo("#answer_letters");
        answerLength--;
        if (!answerLength) {
            playerAnswer = [];
            checkAnswer();
        }
    });
    
    $("#answer_letters").on("click","p",function(){
        $("#answer_correct, #answer_incorrect, #next_button").removeClass("visible");
        $(this).appendTo("#quiz_letters");
        answerLength++;
    });
       
    function newAnswer(){
        $("#answer_letters, #quiz_letters").empty();
        totalQuestions +=1;
        $("#totalQustions").text(totalQuestions);
        makeNewQuestion(questionFromSer);
        $("#question").text(question.id);
        $("#category").text(question.category);
        $("#quest_describe").text(question.question);
        return question.answer;
    };
    
    function questionFromServer(){
        $.ajax({
            type: "GET",
            url: "https://jservice.io/api/random",
            success : function(msg){
                questionFromSer = msg;
                randomLetters(newAnswer());
            }
        });
    }
       
    function makeNewQuestion (apiQuestion){
        question.id = apiQuestion[0].id;
        question.question = apiQuestion[0].question;
        question.answer = apiQuestion[0].answer;
        question.category = apiQuestion[0].category.title;
        answerLength = question.answer.length;
        console.log(question.answer);
    };
    
    function randomLetters (answer){
        var i=0;
        answer = answer.split('').sort();
        answer.forEach(function(elem){
            $("#quiz_letters").append("<p class='ui blue button letters'>"+elem+"</li>");
        })

    };
    
    function checkAnswer(){
        $("#answer_letters").each(function(){
        playerAnswer.push($(this).text());
        });
        if (playerAnswer[0]===question.answer){
        correctAnswers ++;
        $("#correctAnswer").text(correctAnswers);        
        $("#answer_correct, #next_button").addClass("visible");
        } else {
        $("#answer_incorrect").addClass("visible");
        }
    };  
});

