let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors'));

document.querySelector('.js-auto-play-button')
  .addEventListener('click', autoPlay);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') playGame('rock');
  else if (event.key === 'p') playGame('paper');
  else if (event.key === 's') playGame('scissors');
  else if (event.key === 'a') autoPlay();
  else if (event.key === 'Backspace') showResetConfirmation();
});

document.querySelector('.js-reset-score-button')
  .addEventListener('click', showResetConfirmation);

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
    <button class="js-reset-confirm-no reset-confirm-button">No</button>
  `;

  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });

  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', hideResetConfirmation);
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') result = 'You lose.';
    else if (computerMove === 'paper') result = 'You win.';
    else result = 'Tie.';
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') result = 'You win.';
    else if (computerMove === 'paper') result = 'Tie.';
    else result = 'You lose.';
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') result = 'Tie.';
    else if (computerMove === 'paper') result = 'You lose.';
    else result = 'You win.';
  }

  if (result === 'You win.') score.wins++;
  else if (result === 'You lose.') score.losses++;
  else score.ties++;

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  else if (randomNumber < 2 / 3) return 'paper';
  else return 'scissors';
}
