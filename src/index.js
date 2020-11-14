/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import Quizz from './modules/quizz.js'

const content = document.getElementById("content")

const linkD = document.getElementById("linkD")
const linkE = document.getElementById("linkE")
const linkF = document.getElementById("linkF")
const userId = document.getElementById("userId")

let nextUrl = null;


/**
 * Update the webpage with some content.
 */
function updateContent(str) {
  content.innerHTML = str
}



/**
* Use async await and do a GET request
*/
linkD.addEventListener("click", () => {
  let status = "Clicked D"

  updateContent(status)
  console.log(status)

  Quizz.getFirstQuestion()
  .then(response => {
      console.log(response)

      response.json().then((data) => {
          updateContent(data.question);
         
          console.log(JSON.stringify(data, null, 4))

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
linkE.addEventListener("click", () => {
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
linkF.addEventListener("click", () => {
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

