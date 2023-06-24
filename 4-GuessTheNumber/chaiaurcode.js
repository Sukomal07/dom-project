const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSolt = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let randomNumber = parseInt(Math.random() * 100 + 1);

const p = document.createElement('p');

let numGues = 1;
let prevGues = [];
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGues(guess);
  });
}

function validateGues(gues) {
  if (gues === '' || gues < 0 || isNaN(gues)) {
    alert('Please enter a valid number');
  } else if (gues > 100) {
    alert('Enter a number less than 100');
  } else {
    prevGues.push(gues);
    if (numGues === 11) {
      displayGues(gues);
      displayMessage(`Game Over , Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGues(gues);
      checkGues(gues);
    }
  }
}

function checkGues(gues) {
  if (gues === randomNumber) {
    displayMessage('You win');
    endGame();
  } else if (gues < randomNumber) {
    displayMessage('Number is too low');
  } else if (gues > randomNumber) {
    displayMessage('Number is too high');
  }
}
function displayGues(gues) {
  userInput.value = '';
  guessSolt.innerHTML += `${gues}        `;
  numGues++;
  remaining.innerHTML = `${11 - numGues}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}
function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id ="newGame"> Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGues = [];
    numGues = 1;
    guessSolt.innerHTML = '';
    remaining.innerHTML = `${11 - numGues}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
