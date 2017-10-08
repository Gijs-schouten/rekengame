const myProblem = document.getElementById("myProblem");
const myReply = document.getElementById("myReply");
const serialCode = document.getElementById("serialCode");
const myLevel = document.getElementById("myLevel");
const myScore = document.getElementById("myScore");
const startbutton = document.getElementById("startbutton");
const myTime = document.getElementById("myTime");
const info = document.getElementById("info");
const answerField = document.getElementById("answerField");
const result = document.getElementById("result");


var log = [];
var level = 1;
var score = 0;
var problem;
var counter =0;
var beginTime,stopTime;
var myAnswer;
var time;

startbutton.addEventListener('click',()=>{
  answerField.style.visibility = "visible";
  myReply.focus();
  startbutton.style.display = "none";
  beginTime = new Date();
  gameLoop();
  time = setInterval(showTime,100);
})

showTime = function(){
  myTime.innerHTML = "time: " + Math.floor((new Date - beginTime)/1000) + " sec";
}

function gameLoop() {
  myAnswer = {}
  serialCode.innerHTML= "number: " + counter;
  myLevel.innerHTML= "level: " + level;
  myScore.innerHTML= "score: " + score;
  problem = createProblem(level);
  // create a problem
  myProblem.innerHTML = problem.print;
  myAnswer.problem = problem;


}

myReply.addEventListener('keyup', (evt) => {
  if (evt.keyCode == 13) {
    myAnswer.answer = myReply.value;
    //console.log(myAnswer);
    counter++;
    if(counter%2 == 0 && level<4){
      level++;
    }
    if(problem.answer == myReply.value){
      score++;
      answerField.style.backgroundColor = "rgb(200,255,200)";
      myAnswer.correct = true;
    } else{
      answerField.style.backgroundColor = "rgb(255,200,200)";
      myAnswer.correct = false
    }
    myReply.value="";
    log.push(myAnswer);
    console.log(log);

    if(counter>2){
      let outputString = ""
      for(let i=0; i<log.length;i++){
        outputString += log[i].problem.print + " " + log[i].problem.answer + " " + log[i].answer + " " +log[i].correct + "<br>";
      }
      result.innerHTML = outputString;
      clearInterval(time);
    }

    gameLoop();
  }
});


function createProblem(level) {
  let problem = {};
  let a, b, c;
  switch (level) {
    case 1:
      a = createNumber();
      b = createNumber();
      problem.print = a + " &middot; " + b + " = x"
      problem.answer = eval(a * b)
      break;
    case 2:
      a = createNumber();
      b = createNumber();
      problem.print = a + " &middot; x = " + eval(a * b)
      problem.answer = b;
      break;
    case 3:
      a = createNumber();
      b = createNumber();
      c = createNumber();
      problem.print = a + " + " + b + " &middot; " + c + " = x";
      problem.answer = eval(a + b * c);
      break;
    case 4:
      a = createNumber();
      b = createNumber();
      c = createNumber();
      problem.print = a + " + " + b + " &middot; x = " + eval(a + b * c);
      problem.answer = c;
      break;
    default:

  }
  return problem;
}

function createNumber() {
  return Math.floor(Math.random() * 9) + 1
}
