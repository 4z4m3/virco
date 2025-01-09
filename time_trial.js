let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
const result_box = document.querySelector(".result_box");
let answerValue;
let operatorQuestion;
score = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

timeLeft = 60;

function countdown() {
	timeLeft--;
    if (timeLeft < 60 && timeLeft >= 10) {
		setTimeout(countdown, 1000);
        document.getElementById("seconds").innerHTML = `${timeLeft}`;
	}else if (timeLeft < 10 && timeLeft >= 0){
    setTimeout(countdown, 1000);
        document.getElementById("seconds").innerHTML = `0${timeLeft}`;
  }else{
    showResult();

  }

  //   if (timeLeft == -1) {
  //       // setTimeout(countdown, 1000);
	// 	    // alert("Waktu habis")

       
	// }

    
};
 setTimeout(countdown, 1000);

//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
  //Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 100), randomValue(1, 100)];

  //For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];

  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  //Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);

  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 5);

  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }

  //User Input Check
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;
    //If user input is not empty
    if (userInput) {
      //If the user guessed correct answer
      if (userInput == answerValue) {
        questionGenerator();
        score += 100;
        document.getElementById("points").innerHTML = `${score}`;
          
      }
      else {
        questionGenerator();
        score -= 50;
        document.getElementById("points").innerHTML = `${score}`;

      }
    }
  });
};
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function showResult(){
  // info_box.classList.remove("activeInfo"); //hide info box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (score > 1000){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>and congrats! 🎉, You got <p>'+ score +'</p> </span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
  }
  else if(score > 400){ // if user scored more than 1
      let scoreTag = '<span>and nice 😎, You got <p>'+ score +'</p> </span>';
      scoreText.innerHTML = scoreTag;
  }
  else if(score >= 0){ // if user scored more than 1
    let scoreTag = '<span>and sorry 😐, You got only <p>'+ score +'</p> </span>';
    scoreText.innerHTML = scoreTag;
}
  else{ // if user scored less than 1
      let scoreTag = '<span>Unlucky. You got only <p>'+ score +'</p> </span>';
      scoreText.innerHTML = scoreTag;
  }
}
restart_quiz.onclick = ()=>{
  location.reload();
}

quit_quiz.onclick = ()=>{
  window.location = "./games.html"
}


//Start Game
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
;

//Stop Game
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};