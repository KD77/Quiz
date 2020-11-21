import Quizz from './modules/quizz'


const start = document.getElementById("start")
const enter = document.getElementById("enter")
const next = document.getElementById("next")
const userId = document.getElementById("userId")

let nextUrl = null;


/**
 * Update the webpage with some content.
 */
function updateContent(str) {
    content.innerHTML = str
}



start.addEventListener("click", () => {
    let status = "Clicked D"

    updateContent(status)
    console.log(status)

    Quizz.getFirstQuestion()
    .then(response => {
        console.log(response)

        response.json().then((data) => {
            updateContent(JSON.stringify(data, null, 4))
            console.log(data)

            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
})



/**
 * Use async await and do a POST request
 */
 enter.addEventListener("click", () => {
    let status = "Clicked E"
    let id = userId.value
    let body = {
        answer: id
    }

    updateContent(status + id)
    console.log(status + id)

    Quizz.sendQuestionResponsePost(nextUrl, body)
    .then(response => {
        console.log(response)

        response.json().then((data) => {
            updateContent(JSON.stringify(data, null, 4))
            console.log(data)

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

    updateContent(status + id)
    console.log(status + id)

    Quizz.getQuestion(nextUrl)
    .then(response => {
        console.log(response)

        response.json().then((data) => {
            updateContent(JSON.stringify(data, null, 4))
            console.log(data)

            nextUrl = data.nextURL
        });
    })
    .catch((err) => {
        console.log('Fetch Error :-S', err)
    });
})

