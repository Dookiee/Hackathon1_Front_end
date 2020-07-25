var programming_languages = [
    "python",
    "javascript",
    "mongodb",
    "json",
    "java",
    "html",
    "css",
    "c",
    "csharp",
    "golang",
    "kotlin",
    "php",
    "sql",
    "ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let life = 6;

function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
    console.log(answer);
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
         <button
         type="button"
        class="btn btn-primary col-2"
        id='` + letter + `'
        onClick="handleGuess(this.id)"
      >
        ` + letter + `
        </button>
    `).join('');
    document.getElementById('input-button').innerHTML = buttonsHTML;
}


function generateLife() {
    if (localStorage['life'] == undefined | localStorage['life'] == 0 ) {
        localStorage.setItem('life', life)
    }
    img = ''
    for (let i = 0; i < Number(localStorage['life']); i++) {
        img += `
        <img 
        src="./images/life.png"
        id="heartPic"
        alt=""
        >
        `
    }
    document.getElementById('lifes').innerHTML = img
}

function generateScore() {
    if (localStorage['life'] == 0) {
        localStorage.setItem('score', 0)
    }
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    if (answer.indexOf(chosenLetter) >= 0) {
        document.getElementById(chosenLetter).setAttribute('disabled', true);
        document.getElementById(chosenLetter).classList.add("success")
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        document.getElementById(chosenLetter).setAttribute('disabled', true);
        document.getElementById(chosenLetter).classList.add("failure")
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        localStorage.setItem('result', '')
        localStorage.setItem('mistakes', mistakes)
        window.location = './scorePage.html'
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        localStorage.setItem('result', answer)
        window.location = './scorePage.html'
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function resetLocalStorage() {
    localStorage.clear();
}

function reset() {
    resetLocalStorage();
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.jpg';
    randomWord();
    generateLife();
    guessedWord();
    updateMistakes();
    generateButtons();
    generateScore();
}

var init_page = () => {
    document.getElementById('maxWrong').innerHTML = maxWrong;
    randomWord();
    generateLife();
    generateButtons();
    guessedWord();
    generateScore();
}


// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);
