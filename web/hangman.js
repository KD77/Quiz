/**
 * Showing off how to display/hide parts of a SVG-image.
 */

window.Hangman = (function() {
  "use strict";

  var hangman = {
    // Get all elements as their id
    partAsElement: {
      hill: document.getElementById("hang_hill"),
      gallow: document.getElementById("hang_construction"),
      body: document.getElementById("hang_body"),
      rightarm: document.getElementById("hang_rightarm"),
      leftarm: document.getElementById("hang_leftarm"),
      rightleg: document.getElementById("hang_rightleg"),
      leftleg: document.getElementById("hang_leftleg"),
      rope: document.getElementById("hang_rope"),
      head: document.getElementById("hang_head")
    },

    // Create an array with all valid parts
    validParts: [
      "hill",
      "gallow",
      "body",
      "rightarm",
      "leftarm",
      "rightleg",
      "leftleg",
      "rope",
      "head"
    ],

    /**
     * Check if part a valid part, writes error message to console if the part is invalid.
     *
     * @param string part Name of the part to check.
     *
     * @returns boolean true if valid part, else false.
     */
    isValid: function(part) {
      if (this.validParts.indexOf(part) === -1) {
        window.console.log("The part is not valid: " + part);
        return false;
      }
      window.console.log("The part is valid: " + part);
      return true;
    },

    /**
     * Hide a part.
     *
     * @param string part Name of the part to hide.
     *
     * @returns void.
     */
    hide: function(part) {
      if (this.isValid(part)) {
        window.console.log("Hiding part: " + part);
        this.partAsElement[part].style.display = "none";
      }
    },

    /**
     * Show a part.
     *
     * @param string part Name of the part to show.
     *
     * @returns void.
     */
    show: function(part) {
      if (this.isValid(part)) {
        window.console.log("Showing part: " + part);
        this.partAsElement[part].style.display = "inline";
      }
    }
  };



  window.console.log(
    "You can now use the hangman object as a part of the window-object." +
      "Try\n\nwindow.Hangman.hide('gallow')\nwindow.Hangman.show('gallow')" +
      "\n\nHere are all the parts you can work on."
  );
  window.console.log(hangman.validParts);

  // Return the object to make it visible.
  return hangman;
})();

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-word');
const playBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');

const Message = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
window.Hangman.hide("hill");
window.Hangman.hide("gallow");
window.Hangman.hide("body");
window.Hangman.hide("rightarm");
window.Hangman.hide("leftarm");
window.Hangman.hide("rightleg");
window.Hangman.hide("leftleg");
window.Hangman.hide("rope");
window.Hangman.hide("head");

const words = ['application', 'programming', 'interface', 'wizard'];

let word = words[Math.floor(Math.random() * words.length)];
let playable = true;
let tries;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
    ${word
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === word) {
		Message.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';

		playable = false;
	}
}

// Update the wrong letters
function updateWrongLettersEl() {
  tries=9;
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  for(let i =0; i<=wrongLetters.length; i++){
    startDrawing(i);

  }

	// Check if lost
	if (wrongLetters.length === tries) {
		Message.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${word}`;
		popup.style.display = 'flex';

		playable = false;
	}
}



// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (word.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} 
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} 
			}
		}
	}
});

// Restart game and play again
playBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	word = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

  popup.style.display = 'none';
  window.Hangman.hide("hill");
window.Hangman.hide("gallow");
window.Hangman.hide("body");
window.Hangman.hide("rightarm");
window.Hangman.hide("leftarm");
window.Hangman.hide("rightleg");
window.Hangman.hide("leftleg");
window.Hangman.hide("rope");
window.Hangman.hide("head");
});

displayWord();
function startDrawing(guess) {
 
  switch (guess) {
    case 1:
      window.Hangman.show("hill");
      break;
    case 2:
      window.Hangman.show("gallow");
      break;
    case 3:
      window.Hangman.show("body");
      break;
    case 4:
      window.Hangman.show("rightarm");
      break;
    case 5:
      window.Hangman.show("leftarm");
      break;
    case 6:
      window.Hangman.show("rightleg");
      break;
    case 7:
      window.Hangman.show("leftleg");
      break;
    case 8:
      window.Hangman.show("rope");
      break;
    case 9:
      window.Hangman.show("head");
      break;
  }
}







