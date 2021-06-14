// Elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById('C');
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreSlot = document.getElementById("score")


// Questions
let questions = [
{
question : "When was Javascript Created",
choiceA : "1999",
choiceB : "1998",
choiceC : "1995",
choiceD : "2006",
correct : "C"
},
{
question: "What does HTML Mean",
choiceA : "Hypertext Markup Language",
choiceB : "Hype Text Machine Learning ",
choiceC : "Styling for CSS",
choiceD : "None ",
correct : "A"
},
{
question : "What is an exaample of an array",
choiceA : "(Money)",
choiceB : "{Money}",
choiceC : "*Money",
choiceD : "[Money]",
correct : "D"
},
{
question : "What does DOM Stand for",
choiceA : "Document object manager",
choiceB : "Document object model",
choiceC : "Disk object moniter",
choiceD : "Lebron James",
correct : "B"
}
];


const lastQuestion = questions.length -   1;
let runningQuestion = 0;



function renderQuestions(){

    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

const questionTime = 10; 
const gaugeWidth = 150; 
let count = 0;
const gaugeUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;

// Render the question


start.addEventListener("click", startQuiz);

// Start quiz 
function startQuiz(){
    start.style.display = "none"; ///Hide Start button 
    renderQuestions();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();

    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
   
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
      
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){

        score++
    }else{
         answerIsWrong()
        }
        count = 0;
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestions();
        
    }else{
        ///show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
 // answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreSlot.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
   
    scoreSlot.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

