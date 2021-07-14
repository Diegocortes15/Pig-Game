'use strict';

window.addEventListener('load', function () {
    // Selecting elements
    const scoreElement0 = document.querySelector('#score--0');
    const scoreElement1 = document.querySelector('#score--1');
    const currentElement0 = document.querySelector('#current--0');
    const currentElement1 = document.querySelector('#current--1');
    const btnRoll = document.querySelector('#btn--roll');
    const btnHold = document.querySelector('#btn--hold');
    const btnNew = document.querySelector('#btn--new');
    const namePlayer1 = document.querySelector('#name--0');
    const namePlayer2 = document.querySelector('#name--1');
    const player1 = document.querySelector('.player--0');
    const player2 = document.querySelector('.player--1');
    const diceElement = document.querySelector('#dice');

    // Variables
    let scores, currentScore, activePlayer, playing;

    // Starting conditions
    const resetGame = function () {
        scores = [0, 0];
        playing = true;
        activePlayer = 0;
        currentScore = 0;

        scoreElement0.textContent = 0;
        scoreElement1.textContent = 0;
        currentElement0.textContent = 0;
        currentElement1.textContent = 0;

        diceElement.classList.add('hidden');
        player1.classList.remove('player--winner');
        player1.classList.add('player--active');
        player2.classList.remove('player--winner');
        player2.classList.remove('player--active');
        namePlayer1.textContent = 'Player 1';
        namePlayer2.textContent = 'Player 2';
    };
    resetGame();

    const changePlayer = function () {
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player1.classList.toggle('player--active');
        player2.classList.toggle('player--active');
    };

    const playerWin = function () {
        diceElement.classList.add('hidden');
        playing = false;
        currentScore = 0;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        return (document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
            activePlayer + 1
        } Win`);
    };

    btnRoll.addEventListener('click', function () {
        if (playing) {
            const randomDice = Math.trunc(Math.random() * 6) + 1;
            diceElement.src = `dice-${randomDice}.png`;
            diceElement.classList.remove('hidden');

            if (randomDice !== 1) {
                currentScore += randomDice;
                document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            } else {
                changePlayer();
            }
        }
    });

    btnHold.addEventListener('click', function () {
        if (playing) {
            scores[activePlayer] += currentScore;
            document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
            if (document.querySelector(`#score--${activePlayer}`).textContent >= 100) {
                playerWin();
            } else {
                changePlayer();
            }
        }
    });

    btnNew.addEventListener('click', resetGame);
});
