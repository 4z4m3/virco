const result = document.getElementById("result");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

const generateS = (x, y, a, b) => {
    let positionOf5 = Math.floor(Math.random() * x * y) + 1;
    let text = '';
    for(let i=0; i<x*y; i++) {
        text += (i==positionOf5) ? `<span onclick='showResult()'>${a}</span><span>&nbsp;</span>` : `<span onclick='myFunc2()'>${b}&nbsp;</span>`;
        if(!((i+1)%x)) text+='<br>';
    }
        
    return text;
}

document.getElementById('container').innerHTML = generateS(15, 15, 5, 'S');
let next = 0;
let find = 'A';
let diff = 'Medium'
let line = '4';
let length = 30;
let wide = 15;

const myFunc = () => {
    next++;
    timeLeft = 10;
    document.getElementById('container').innerHTML = generateS(length, wide, find, line);
    document.getElementById("title-change").innerHTML = find;
    document.getElementById("diff-change").innerHTML = diff;
    diff = 'Hard'
    find = '1';
    line = 'l';
    length = 50;
    wide = 15;


    if (next == 3) {
        myFunc();
    }
}

const myFunc2 = () => {
    alert("Kamu Salah");
    location.reload()
}


timeLeft = 10;

function countdown() {
	timeLeft--;
    if (timeLeft < 10) {
		setTimeout(countdown, 1000);
        document.getElementById("seconds").innerHTML = `0${timeLeft}`;
	}

    if (timeLeft == -1) {
        setTimeout(countdown, 1000);
		alert("Waktu habis")
        location.reload()
	}

    if (timeLeft == 11) {
        return;
    }
};
countdown();

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function showResult(){
  // info_box.classList.remove("activeInfo"); //hide info box
  timeLeft = 11;
  result_box.classList.add("activeResult"); 
  quit_quiz.classList.remove("hide");
  result_box.style.display = "flex";
  restart_quiz.classList.remove("hide");
  result.classList.remove("hide");
  startBtn.classList.remove("hide");//show result box\
  }

restart_quiz.onclick = ()=>{
    myFunc();
    countdown();
    quit_quiz.classList.add("hide");
    result_box.style.display = "none";
    restart_quiz.classList.add("hide");
    result.classList.add("hide");
    startBtn.classList.add("hide");
    



}

quit_quiz.onclick = ()=>{
  window.location = "./games.html"
}