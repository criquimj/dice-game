'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currScore0El = document.querySelector('#current--0');
const currScore1El = document.querySelector('#current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const setInitialGameState = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
setInitialGameState();

const setEndgame = () => {
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
};

// Helper functions
const rollDice = () => {
  diceEl.classList.remove('hidden');
  return Math.floor(Math.random() * 6 + 1);
};

const setDiceImg = rollValue => {
  diceEl.src = `dice-${rollValue}.png`;
};

const switchPlayer = () => {
  // reset current score
  currentScore = 0;
  // switch to next player programmatically
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // visually switch the next player in UI
  [...document.querySelectorAll('.player')].forEach(el =>
    el.classList.toggle('player--active')
  );
};

btnRoll.addEventListener('click', () => {
  // Generate dice roll
  const roll = rollDice();
  // display corresponding dice img
  setDiceImg(roll);

  // check for rolled 1
  if (roll !== 1) {
    // add roll to current score
    currentScore += roll;
    // display current score
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;

    // check for winner
    if (scores[activePlayer] + currentScore >= 20) {
      // set winning status
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //set endgame status
      setEndgame();
    }
  } else {
    // switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  // update active player total score
  scores[activePlayer] += currentScore;

  // display active player total score
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  switchPlayer();
});

btnNewGame.addEventListener('click', () => {
  setInitialGameState();
});
