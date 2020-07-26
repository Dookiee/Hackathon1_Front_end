var easy = [
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

var medium = [
    "according",
    "account",
    "across",
    "activity",
    "actually",
    "address",
    "administration",
    "agreement",
    "attention",
    "attorney",
    "audience",
    "author",
    "authority",
    "available",
]

var hard = [
    "enormity",
    "disinterested",
    "nonplussed",
    "colonel",
    "irregardless",
    "literally",
    "aberration",
    "abnegation",
    "abscond",
    "abstruse",
    "accretion",
    "adumbrate",
    "aggrandize",
    "ambivalent",
    "anachronistic",
    "approbation"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let life = 6;
let level = 1;

function randomWord() {
    if (Number(localStorage['level']) < 5) {
        _difficulty = "EASY"
        answer = easy[Math.floor(Math.random() * easy.length)];
    } else if (Number(localStorage['level']) < 10) {
        _difficulty = "MEDIUM"
        answer = medium[Math.floor(Math.random() * medium.length)];
    } else {
        _difficulty = "HARD"
        answer = hard[Math.floor(Math.random() * hard.length)];
    }
    document.getElementById('level').innerText = "Game Level: " + localStorage['level']
    document.getElementById('difficulty').innerText = "Game Difficulty: "+_difficulty
    document.getElementById('score').innerText = "Total Score: " + localStorage['score']
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

function setLevel() {
    localStorage.setItem('level', 1)
}


function generateLife() {
    if (localStorage['life'] == undefined | localStorage['life'] == 0) {
        localStorage.setItem('life', life)
        localStorage.setItem('score', 0)
        localStorage.setItem('level', 1)
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

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    if (answer.indexOf(chosenLetter) >= 0) {
        new Audio('./sounds/success.mp3').play();
        document.getElementById(chosenLetter).setAttribute('disabled', true);
        document.getElementById(chosenLetter).classList.add("success")
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        new Audio('./sounds/failure.mp3').play();
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
    generateLife();
    guessedWord();
    updateMistakes();
    generateButtons();
    setLevel();
    randomWord();
}

var init_page = () => {
    document.getElementById('maxWrong').innerHTML = maxWrong;
    document.getElementById('hangmanPic').src = './images/0.jpg';
    updateMistakes();
    generateLife();
    generateButtons();
    randomWord();
    guessedWord();
}