'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currScore0El = document.querySelector('#current--0');
const currScore1El = document.querySelector('#current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const currScoreDisplay = document.querySelector('.current-score');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const setInitialGameState = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');
};
setInitialGameState();

// Helper functions
const rollDice = () => {
  diceEl.classList.remove('hidden');
  return Math.floor(Math.random() * 6 + 1);
};

console.log(diceEl.attributes.src);

btnRoll.addEventListener('click', () => {
  // Generate dice roll
  const roll = rollDice();

  // display dice
  diceEl.setAttribute('src', `./dice-${roll}.png`);

  // check for rolled 1
});
