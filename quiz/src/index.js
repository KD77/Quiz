import Quizz from './modules/quizz';


const startBtn = document.getElementById('start');
const enter = document.getElementById('enter');
const next = document.getElementById('next');
const userId = document.getElementById('userId');
let name = document.getElementById('nickname');
let btn = document.getElementById('btn');
const playBtn = document.getElementById('play-button');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');

let nextUrl = null;
let choice = false;
let count = 0;
let timer;

/**
 * Update the webpage with some content.
 */
function updateContent(str) {
  content.innerHTML = str;
}

function countDownTimer() {
  let timeleft = 10
  let x = document.getElementById('box').value;

   timer = setInterval(function () {
     timeleft--;
    if (timeleft === -1) {
     gameOver(); 
     clearInterval(timer);
      
      
    } else {
      document.getElementById('countDown').innerHTML = timeleft + ' seconds';
    }
    
  }, 1000);
}

/**
 * Use async await and do a POST request
 */
enter.addEventListener('click', () => {
  let status = 'Clicked E';
  let id;
  let body;
  count++;

  if (!choice) {
    id = userId.value;
  } else if (choice) {
    id = document.querySelector('.checkbox:checked').value;
  }
  if (count === 7) {
   name = document.getElementById('nickname').value;
   // let person = new Person(name);
    
  
    document.getElementById(
      'results',
    ).innerHTML = `${name}:${count}`+ ' points';
   
won();
    nextUrl = 'http://1dv525.mikaelroos.se:3000/answer/326';
    
  
  }
  body = {
    answer: id,
  };

  updateContent(status + id);
  console.log(status + id);

  Quizz.sendQuestionResponsePost(nextUrl, body)
    .then((response) => {
      console.log(response);
  
      response.json().then((data) => {
        // updateContent(data.message)
        console.log(data);
        console.log(JSON.stringify(data, null, 4));
        updateContent(data.message);

        nextUrl = data.nextURL;
      });
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
    clearInterval(timer)
});

/**
 * Use async await and do a GET request
 */
next.addEventListener('click', () => {
  let status = 'Clicked F';
  let id = userId.value;

  let x = document.getElementById('box').vale;

  updateContent(status + id);
  console.log(status + id);
  clearInterval(timer)
  //countDownTimer(timeleft)

  Quizz.getQuestion(nextUrl)
    .then((response) => {
      console.log(response);
      
      response.json().then((data) => {
        updateContent(data.question);
        console.log(data);
        console.log(JSON.stringify(data, null, 4));
//countDownTimer(timeleft);
        checkInputAndCheckbox(data);

        nextUrl = data.nextURL;
      });
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
   countDownTimer()
});


btn.onclick = function () {
  name = document.getElementById('nickname').value;
  //let person = new Person(name);
 console.log(name);
  document.getElementById('displayName').innerHTML = name;
  //
  document.getElementById('box').style.display = 'block';
  document.getElementById('name').style.display = 'none';
  document.getElementById('input-and-checkbox').style.display = 'none';
  document.getElementById('btn-enter-next').style.display = 'none';
  updateContent("Press start to began the quizz")
  start();

};
function checkInputAndCheckbox(data) {
  choice = false;
  if (data.hasOwnProperty('alternatives')) {
    document.getElementById('checkbox').style.display = 'block';
    document.getElementById('input').style.display = 'none';
    if (data.hasOwnProperty('alternatives')) {
      document.getElementById('lbl-alt1').innerHTML = data.alternatives.alt1;
      document.getElementById('lbl-alt2').innerHTML = data.alternatives.alt2;
      if (data.alternatives != null) {
        document.getElementById('lbl-alt3').innerHTML = data.alternatives.alt3;
      }
      if (data.alternatives !== null) {
        document.getElementById('lbl-alt4').innerHTML = data.alternatives.alt4;
      } 
      if (data.alternatives === null || data.alternatives==='undefined'){
        let x = document.getElementById('lbl-alt4').innerHTML = data.alternatives.alt4;
        x.disable= true;
      }
      else {
        document.getElementById('lbl-alt4').disable = true;
       
      }
      choice = true;
    }
  } else {
    document.getElementById('input').style.display = 'block';
    document.getElementById('checkbox').style.display = 'none';
  }
}
function gameOver(){
 
    updateContent('Unfortunately you lost. 😕')
    
hideInputAndCheckbox();
    
    //popup.style.display = 'flex';
    

  
}
function won (){
  
  document.getElementById('countDown').innerHTML='Congratulations! You won! 😃';
  hideInputAndCheckbox();
}
// Restart game and play again
playBtn.onclick=function(){
  start();
  document.getElementById('content').style.display = 'block';
  document.getElementById('input-and-checkbox').style.display = 'block';
  document.getElementById('btn-enter-next').style.display = 'inline';

  popup.style.display = 'none';
   
} 
function start(){
  
  startBtn.addEventListener('click', () => {
    document.getElementById('input-and-checkbox').style.display = 'block';
    document.getElementById('btn-enter-next').style.display = 'inline';
    let status = 'Clicked D';
   
    //countDownTimer(timeleft);
    updateContent(status);
    console.log(status);
    countDownTimer();
    Quizz.getFirstQuestion()

      .then((response) => {
        console.log(response);
        
        response.json().then((data) => {
          updateContent(data.question);
          // updateContent(JSON.stringify(data, null, 4))
          //console.log(data)
          checkInputAndCheckbox(data);
          console.log(JSON.stringify(data, null, 4));

          nextUrl = data.nextURL;
        });
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
   
  });
  
}
function hideInputAndCheckbox(){
    document.getElementById('box').style.display = 'none';
    document.getElementById('name').style.display = 'none';
    document.getElementById('input-and-checkbox').style.display = 'none';
    document.getElementById('btn-enter-next').style.display = 'none';
    document.getElementById('box').style.display = 'block';
  }