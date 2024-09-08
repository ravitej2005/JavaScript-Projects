let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement()

function pickComputerMove() {
  let randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber < 1 / 3) computerMove = 'rock';
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) computerMove = 'paper';
  else if (randomNumber >= 2 / 3) computerMove = 'scissors';

  return computerMove;
}

let intervalId;
let isAutoPlaying = false;
function autoPlay(){
  if (!isAutoPlaying) {
      intervalId = setInterval(function(){
        const playerMove = pickComputerMove();
        playGame(playerMove)
      },1000);
      isAutoPlaying = true;  
      document.querySelector('.js-autoPlay').innerHTML = 'Stop'
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      document.querySelector('.js-autoPlay').innerHTML = 'Auto Play'
    }
  }

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = '';

  if (computerMove === playerMove) result = 'Tie.';

  else if (computerMove === 'rock') {
    if (playerMove === 'paper') result = 'You win.';
    else if (playerMove === 'scissors') result = 'You lose.';
  }

  else if (computerMove === 'paper') {
    if (playerMove === 'scissors') result = 'You win.';
    else if (playerMove === 'rock') result = 'You lose.';
  }

  else if (computerMove === 'scissors') {
    if (playerMove === 'paper') result = 'You lose.';
    else if (playerMove === 'rock') result = 'You win.';
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }



  let jsonString = JSON.stringify(score);
  localStorage.setItem('score', jsonString);

  document.querySelector('.js-result').innerHTML = `${result}`

  document.querySelector('.js-moves').innerHTML = `<span>You</span> <img src="./assets/Img/${playerMove}-emoji.png" class="h-12 "> <span>-</span> <img src="./assets/Img/${computerMove}-emoji.png" class="h-12 "> <span>Computer</span>`

  updateScoreElement()
}

function reset_button() {
  document.querySelector('.js-result').innerHTML = ''
  document.querySelector('.js-moves').innerHTML = ''
  updateScoreElement()
}


function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}