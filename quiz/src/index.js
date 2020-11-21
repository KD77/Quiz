import Quizz from './modules/quizz'


const start = document.getElementById("start")
const enter = document.getElementById("enter")
const next = document.getElementById("next")
const userId = document.getElementById("userId")

let nextUrl = null;
let choice = false;


/**
 * Update the webpage with some content.
 */
function updateContent(str) {
    content.innerHTML = str
}



start.addEventListener("click", () => {
    let status = "Clicked D"
    countDownTimer();
    updateContent(status)
    console.log(status)

    Quizz.getFirstQuestion()
    .then(response => {
        console.log(response)

        response.json().then((data) => {
            updateContent(data.question);
           // updateContent(JSON.stringify(data, null, 4))
            //console.log(data)
            console.log(JSON.stringify(data, null, 4))

            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
})
function countDownTimer(){
    let timeleft=10;
    let x=document.getElementById("box").value;
    let timer = setInterval(function(){

        if(timeleft<=0){
            clearInterval(timer);

            document.getElementById("box").style.display = "none";
            document.getElementById("enter").style.display = "none";
            document.getElementById("next").style.display = "none";
            document.getElementById("intro").style.display = "none";
            document.getElementById("content").style.display = "none";
            document.getElementById("userId").style.display = "none";
          if(x==='none'){
            document.getElementById("box").style.display = "block";
            document.getElementById("enter").style.display = "block";
            document.getElementById("next").style.display = "block";
            document.getElementById("intro").style.display = "block";
            document.getElementById("content").style.display = "block";
            document.getElementById("userId").style.display = "block";
          }
            document.getElementById("countDown").innerHTML="END";


        }else{
            document.getElementById("countDown").innerHTML=timeleft + " seconds";  
        }
        timeleft = timeleft-1;
    },1000);
}



/**
 * Use async await and do a POST request
 */
 enter.addEventListener("click", () => {
    let status = "Clicked E"
    let id ;
    let body;

    if(!choice){
        id=userId.value;
    }
    else if (choice){
        id=document.querySelector(".checkbox:checked").value;
    }

    body = {
        answer: id
    }
    

    updateContent(status + id)
    console.log(status + id)

    Quizz.sendQuestionResponsePost(nextUrl, body)
    .then(response => {
        console.log(response)

        response.json().then((data) => {
            //updateContent(JSON.stringify(data, null, 4))
            //console.log(data)
            updateContent(data.message)
            console.log(JSON.stringify(data, null, 4))

            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
})



/**
 * Use async await and do a GET request
 */
next.addEventListener("click", () => {
    let status = "Clicked F"
    let id = userId.value
    choice=false;
    let x = document.getElementById("box").vale;

    updateContent(status + id)
    console.log(status + id)

    Quizz.getQuestion(nextUrl)
    .then(response => {
        console.log(response)

        response.json().then((data) => {
          updateContent(data.question)
            console.log(data)
           console.log(JSON.stringify(data, null, 4))

           if(data.hasOwnProperty('alternatives') ){
             x = document.getElementById("box").style.display = "block";
            if(data.hasOwnProperty('alternatives')){
                document.getElementById("lbl-alt1").innerHTML=data.alternatives.alt1;
                document.getElementById("lbl-alt2").innerHTML=data.alternatives.alt2;
                if(data.alternatives!=null){
                    document.getElementById("lbl-alt3").innerHTML=data.alternatives.alt3;
                }
                if (data.alternatives!=null){
                    document.getElementById("lbl-alt4").innerHTML=data.alternatives.alt4;
                    
                }
                else{
                    document.getElementById("lbl-alt4").disable=true;
                }
                choice=true;
            }
            
        
          }
          else{
            x = document.getElementById("box").style.display = "none";
          }


            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
   
  })


