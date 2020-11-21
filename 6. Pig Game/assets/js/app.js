/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const PigGame = new Game();
const { btn_roll, img_dice, whoIsPlaying } = PigGame;

// event for round score button constraints: current player
btn_roll
    .addEventListener('click', function () {
        const randomDiceValue = Math.floor(Math.random() * 6) + 1;

        img_dice.setAttribute('src', `/assets/images/dice-${randomDiceValue}.png`);

        if (randomDiceValue === 1) {
            PigGame.nextPlayer();
            return null;
        }

        PigGame.calculateRoundScore(randomDiceValue);
        PigGame.updateRoundScoreDisplay(randomDiceValue);
    })







// MODEL FOR GAME
function Game() {
    this.isStarted = true;
    this.whoIsPlaying = '1';
    this.whoIsWinner = '';
    this.P1RoundScore = 0;
    this.P1GlobalScore = 0;
    this.P2RoundScore = 0;
    this.P2GlobalScore = 0;
    this.img_dice = document.querySelector('.dice');
    this.btn_roll = document.querySelector('.btn-roll');
    this.nextPlayer = () => {
        const currentPlayer = `P${this.whoIsPlaying}RoundScore`

        this[currentPlayer] = 0;
        this.updateRoundScoreDisplay();

        this.whoIsPlaying === '1'
            ? this.whoIsPlaying = '2'
            : this.whoIsPlaying = '1'
    }
    this.calculateRoundScore = score => {
        const currentPlayer = `P${this.whoIsPlaying}RoundScore`
        this[currentPlayer] = this[currentPlayer] + parseFloat(score)
    };
    this.calculateGlobalScore = roundScore => {
        const currentPlayer = `P${this.whoIsPlaying}GlobalScore`
        this[currentPlayer] = this[currentPlayer] + parseFloat(roundScore)
    };
    this.updateRoundScoreDisplay = () => {
        document.querySelector(`#current-${this.whoIsPlaying}`)
            .textContent = this[`P${this.whoIsPlaying}RoundScore`];
    }
}