'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currScore0El = document.querySelector('#current--0');
const currScore1El = document.querySelector('#current--1');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

let scoreKeeper = {
  player0: {
    totalScore: 0,
    currScore: 0,
  },
  player1: {
    totalScore: 0,
    currScore: 0,
  },
};

// const scores = [0,0];
// let currentScore = 0;
// let activePlayer = 0;

const setInitialGameState = () => {
  scoreKeeper = {
    player0: {
      totalScore: 0,
      currScore: 0,
    },
    player1: {
      totalScore: 0,
      currScore: 0,
    },
  };
  score0El.textContent = scoreKeeper.player0.totalScore;
  score1El.textContent = scoreKeeper.player1.totalScore;
  currScore0El.textContent = scoreKeeper.player0.currScore;
  currScore1El.textContent = scoreKeeper.player1.currScore;
  diceEl.classList.add('hidden');
  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');
  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');
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

btnRoll.addEventListener('click', () => {
  // Check which player is rolling
  if (player0Section.classList.contains('player--active')) {
    let player = 0;
    // Generate dice roll
    const roll = rollDice();

    // display dice
    setDiceImg(roll);

    // check for rolled 1
    if (roll === 1) {
      // reset current score
      scoreKeeper.player0.currScore = 0;
      currScore0El.textContent = scoreKeeper.player0.currScore;
      // switch player
      player0Section.classList.remove('player--active');
      player1Section.classList.add('player--active');
    }
    if (roll !== 1) {
      // add roll to current score
      scoreKeeper.player0.currScore += roll;
      // display current score
      currScore0El.textContent = scoreKeeper.player0.currScore;
      //check for winner
      if (
        scoreKeeper.player0.currScore + scoreKeeper.player0.totalScore >=
        20
      ) {
        player0Section.classList.add('player--winner');
        setEndgame();
      }
    }
  } else {
    // Generate dice roll
    const roll = rollDice();

    // display dice
    setDiceImg(roll);

    // check for rolled 1
    if (roll === 1) {
      // reset current score
      scoreKeeper.player1.currScore = 0;
      currScore1El.textContent = scoreKeeper.player1.currScore;
      // switch player
      player1Section.classList.remove('player--active');
      player0Section.classList.add('player--active');
    }
    if (roll !== 1) {
      // add roll to current score
      scoreKeeper.player1.currScore += roll;
      // display current score
      currScore1El.textContent = scoreKeeper.player1.currScore;
      //check for winner
      if (
        scoreKeeper.player1.currScore + scoreKeeper.player1.totalScore >=
        20
      ) {
        player1Section.classList.add('player--winner');
        setEndgame();
      }
    }
  }
});

btnHold.addEventListener('click', () => {
  // check which player
  if (player0Section.classList.contains('player--active')) {
    // set score
    scoreKeeper.player0.totalScore += scoreKeeper.player0.currScore;
    // display new total score
    score0El.textContent = scoreKeeper.player0.totalScore;
    scoreKeeper.player0.currScore = 0;
    currScore0El.textContent = scoreKeeper.player0.currScore;
    // switch player
    player0Section.classList.remove('player--active');
    player1Section.classList.add('player--active');
  } else {
    // set score
    scoreKeeper.player1.totalScore += scoreKeeper.player1.currScore;
    // display new total score
    score1El.textContent = scoreKeeper.player1.totalScore;
    scoreKeeper.player1.currScore = 0;
    currScore1El.textContent = scoreKeeper.player1.currScore;
    // switch player
    player1Section.classList.remove('player--active');
    player0Section.classList.add('player--active');
  }
});

btnNewGame.addEventListener('click', () => {
  setInitialGameState();
});
