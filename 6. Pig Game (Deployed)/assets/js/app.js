const PigGame = new Game();
const BackgroundMusic = new Audio('/assets/audios/bensound-buddy.mp3');
const { btn_roll, btn_hold, btn_new } = PigGame;

// event for new game
btn_new.addEventListener('click', PigGame.newGame)

// event for round score/roll button
btn_roll.addEventListener('click', PigGame.rollDice)

// event for global score button
btn_hold.addEventListener('click', PigGame.updateGlobalScoreDisplay)

// play background music with lesser volume and on-loop
BackgroundMusic.play()
BackgroundMusic.loop = true;
BackgroundMusic.volume = 0.1




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