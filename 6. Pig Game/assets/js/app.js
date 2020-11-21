/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const PigGame = new Game();
const { btn_roll, btn_hold, btn_new } = PigGame;

// event for new game
btn_new.addEventListener('click', PigGame.newGame)

// event for round score/roll button
btn_roll.addEventListener('click', PigGame.rollDice)

// event for global score button
btn_hold.addEventListener('click', PigGame.updateGlobalScoreDisplay)






// MODEL FOR GAME
function Game() {
    this.hasStarted = true;
    this.whoIsWinner = '';
    this.whoIsPlaying = '1';
    this.P1RoundScore = 0;
    this.P1GlobalScore = 0;
    this.P2RoundScore = 0;
    this.P2GlobalScore = 0;
    this.img_dice = document.querySelector('.dice');
    this.btn_new = document.querySelector('.btn-new');
    this.btn_roll = document.querySelector('.btn-roll');
    this.btn_hold = document.querySelector('.btn-hold');
    this.calculateRoundScore = score => {
        const currentPlayer = `P${this.whoIsPlaying}RoundScore`
        this[currentPlayer] = parseFloat(this[currentPlayer]) + parseFloat(score)
    };
    this.calculateGlobalScore = roundScore => {
        const currentPlayer = `P${this.whoIsPlaying}GlobalScore`
        this[currentPlayer] = parseFloat(this[currentPlayer]) + parseFloat(roundScore)
    };
    this.updateRoundScoreDisplay = () => {
        document.querySelector(`#current-${this.whoIsPlaying}`)
            .textContent = this[`P${this.whoIsPlaying}RoundScore`];
    };
    this.updateGlobalScoreDisplay = () => {
        const currentPlayerGlobalScore = `P${this.whoIsPlaying}GlobalScore`
        const currentPlayerRoundScore = `P${this.whoIsPlaying}RoundScore`
        const globalScoreDiplay = document.querySelector(`#score-${this.whoIsPlaying}`);
        const globalScoreNew = this[currentPlayerGlobalScore] + this[currentPlayerRoundScore]
        globalScoreDiplay.textContent = globalScoreNew;
        this[currentPlayerGlobalScore] = globalScoreNew;
        this.updateRoundScoreDisplay();
        this.nextPlayer();
    };
    this.nextPlayer = () => {
        const currentPlayer = `P${this.whoIsPlaying}RoundScore`
        const currentPlayerPanel = `.player-${this.whoIsPlaying}-panel`

        this[currentPlayer] = 0;
        this.updateRoundScoreDisplay();
        document.querySelector(currentPlayerPanel).classList.remove('active')

        switch (this.whoIsPlaying) {
            case '1':
                document.querySelector('.player-2-panel').classList.add('active')
                this.whoIsPlaying = '2'
                break;
            case '2':
                document.querySelector('.player-1-panel').classList.add('active')
                this.whoIsPlaying = '1'
                break;
        }
    };
    this.rollDice = () => {
        const randomDiceValue = Math.floor(Math.random() * 6) + 1;

        this.img_dice.setAttribute('src', `/assets/images/dice-${randomDiceValue}.png`);

        if (randomDiceValue === 1) {
            this.nextPlayer();
            return null;
        }

        this.calculateRoundScore(randomDiceValue);
        this.updateRoundScoreDisplay(randomDiceValue);
    };
    this.newGame = () => {
        this.hasStarted = true;
        this.whoIsWinner = '';
        this.P1RoundScore = 0;
        this.P1GlobalScore = 0;
        this.P2RoundScore = 0;
        this.P2GlobalScore = 0;
        this.whoIsPlaying = '1';
        this.updateGlobalScoreDisplay();
        this.updateRoundScoreDisplay();
        this.whoIsPlaying = '2';
        this.updateGlobalScoreDisplay();
        this.updateRoundScoreDisplay();
        document.querySelector('.player-2-panel').classList.remove('active')
        document.querySelector('.player-1-panel').classList.add('active')
    }
}