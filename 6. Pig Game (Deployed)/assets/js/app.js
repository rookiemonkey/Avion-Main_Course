const PigGame = new Game();
const BackgroundMusic = new Audio('/assets/audios/bensound-buddy.mp3');
const RollDiceSound = new Audio('/assets/audios/dice-roll.mp3');
const LosePointsSound = new Audio('/assets/audios/lose-points.mp3');
const AddPointsSound = new Audio('/assets/audios/add-points.mp3');
const ApplauseSound = new Audio('/assets/audios/applause.mp3')
const { btn_roll, btn_hold, btn_new, btn_start, btn_home,
    select_language, toggler_theme } = PigGame;

// event for changing the language
select_language.addEventListener('change', PigGame.changeLanguage)

// event for changing the theme
toggler_theme.addEventListener('change', PigGame.changeTheme)

// event for starting/restarting the game
btn_start.addEventListener('click', PigGame.startGame)
btn_home.addEventListener('click', PigGame.startGame)

// event for new game
btn_new.addEventListener('click', PigGame.newGame)

// event for round score/roll button
btn_roll.addEventListener('click', PigGame.rollDice)

// event for global score button
btn_hold.addEventListener('click', PigGame.updateGlobalScoreDisplay)

// play background music with lesser volume and on-loop
BackgroundMusic.play()
BackgroundMusic.loop = true;
BackgroundMusic.volume = 0.1;

// adjust volume for sprites
RollDiceSound.volume = 0.2;
LosePointsSound.volume = 0.2;
AddPointsSound.volume = 0.2;
ApplauseSound.volume = 0.2






// MODEL FOR GAME
function Game() {
    this.diceval = 0;
    this.whoIsPlaying = '1';
    this.P1RoundScore = 0;
    this.P1GlobalScore = 0;
    this.P2RoundScore = 0;
    this.P2GlobalScore = 0;
    this.img_dice = document.querySelector('.dice');
    this.toggler_theme = document.querySelector('#theme');
    this.select_language = document.querySelector('#language');
    this.panelInitial = document.querySelector('.initial-panel');
    this.btn_start = document.querySelector('.btn-start');
    this.btn_home = document.querySelector('.btn-home');
    this.btn_new = document.querySelector('.btn-new');
    this.btn_roll = document.querySelector('.btn-roll');
    this.btn_hold = document.querySelector('.btn-hold');
    this.howtoplay = document.querySelector('.howtoplay');
    this.winner1 = document.querySelector('#winner-1');
    this.winner2 = document.querySelector('#winner-2');
    this.p1label = document.querySelector("#name-1");
    this.p2label = document.querySelector("#name-2");
    this.p1rolled1 = document.querySelector('#rolled1-P1');
    this.p2rolled1 = document.querySelector('#rolled1-P2');
    this.current = document.querySelectorAll('.player-current-label');
    this.ptag1 = document.querySelector('.ptag1');
    this.ptag2 = document.querySelector('.ptag2');
    this.ptag3 = document.querySelector('.ptag3');
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
        AddPointsSound.play();
        const currentPlayerGlobalScore = `P${this.whoIsPlaying}GlobalScore`
        const currentPlayerRoundScore = `P${this.whoIsPlaying}RoundScore`
        const addedScoreDisplay = document.querySelector(`#scoreadd-${this.whoIsPlaying}`);
        const globalScoreDisplay = document.querySelector(`#score-${this.whoIsPlaying}`);
        const globalScoreNew = this[currentPlayerGlobalScore] + this[currentPlayerRoundScore]
        globalScoreDisplay.textContent = globalScoreNew;
        addedScoreDisplay.textContent = `+${this[currentPlayerRoundScore]}`
        addedScoreDisplay.classList.add('slide-in-frombottom')
        setTimeout(() => {
            addedScoreDisplay.classList.add('slide-out-tobottom');
        }, 1000)
        setTimeout(() => {
            addedScoreDisplay.classList.remove('slide-in-frombottom');
            addedScoreDisplay.classList.remove('slide-out-tobottom');
        }, 2000)
        this[currentPlayerGlobalScore] = globalScoreNew;
        this.updateRoundScoreDisplay();

        if (this[currentPlayerGlobalScore] >= 100) {
            ApplauseSound.play();
            const panel = document.querySelector(`.player-${this.whoIsPlaying}-panel`);
            const promptWinner = document.querySelector(`#winner-${this.whoIsPlaying}`);
            panel.style.backgroundImage = `url('/assets/images/winner.png')`
            promptWinner.style.visibility = `visible`
            this.img_dice.style.visibility = `hidden`
            this.btn_roll.style.visibility = `hidden`
            this.btn_hold.style.visibility = `hidden`
            return null;
        }

        this.nextPlayer();
    };
    this.nextPlayer = () => {
        const currentPlayer = `P${this.whoIsPlaying}RoundScore`
        const currentPlayerPanel = `.player-${this.whoIsPlaying}-panel`
        const currentPlayerPrompt = `#rolled1-P${this.whoIsPlaying}`

        if (this.diceval === 1)
            document.querySelector(currentPlayerPrompt).classList.add('fade-in-top')

        this[currentPlayer] = 0;
        this.updateRoundScoreDisplay();

        switch (this.whoIsPlaying) {
            case '1':
                document.querySelector(currentPlayerPanel).classList.remove('active-1')
                this.whoIsPlaying = '2'
                document.querySelector('.player-2-panel').classList.add('active-2')
                document.querySelector(`#rolled1-P${this.whoIsPlaying}`).classList.remove('fade-in-top')
                break;
            case '2':
                document.querySelector(currentPlayerPanel).classList.remove('active-2')
                this.whoIsPlaying = '1'
                document.querySelector('.player-1-panel').classList.add('active-1')
                document.querySelector(`#rolled1-P${this.whoIsPlaying}`).classList.remove('fade-in-top')
                break;
        }
    };
    this.rollDice = () => {
        RollDiceSound.play();
        this.diceval = Math.floor(Math.random() * 6) + 1;
        this.img_dice.setAttribute('src', `/assets/images/dice-${this.diceval}.png`);
        this.img_dice.classList.add('rotate-center')
        setTimeout(() => this.img_dice.classList.remove('rotate-center'), 250) // check css

        if (this.diceval === 1) {
            LosePointsSound.play();
            this.nextPlayer();
            return null;
        }

        this.calculateRoundScore(this.diceval);
        this.updateRoundScoreDisplay(this.diceval);
    };
    this.startGame = () => {
        this.newGame();
        const initialPanel = document.querySelector('.initial-panel');
        const p1Panel = document.querySelector('.player-1-panel');
        const p2Panel = document.querySelector('.player-2-panel');

        initialPanel.classList.toggle('hidden');
        p1Panel.classList.toggle('hidden');
        p2Panel.classList.toggle('hidden');
        this.img_dice.classList.toggle('hidden');
        this.btn_home.classList.toggle('hidden');
        this.btn_new.classList.toggle('hidden');
        this.btn_roll.classList.toggle('hidden');
        this.btn_hold.classList.toggle('hidden');
    };
    this.newGame = () => {
        this.hasStarted = true;
        this.whoIsWinner = '';
        this.P1RoundScore = 0;
        this.P1GlobalScore = 0;
        this.P2RoundScore = 0;
        this.P2GlobalScore = 0;
        this.whoIsPlaying = '2';
        document.querySelector(`#score-${this.whoIsPlaying}`).textContent = 0;
        document.querySelector(`#rolled1-P${this.whoIsPlaying}`).classList.remove('fade-in-top')
        document.querySelector(`.player-${this.whoIsPlaying}-panel`).style.backgroundImage = ``
        document.querySelector(`#winner-${this.whoIsPlaying}`).style.visibility = 'hidden'
        this.updateRoundScoreDisplay();
        this.whoIsPlaying = '1';
        document.querySelector(`#score-${this.whoIsPlaying}`).textContent = 0
        document.querySelector(`#rolled1-P${this.whoIsPlaying}`).classList.remove('fade-in-top')
        document.querySelector(`.player-${this.whoIsPlaying}-panel`).style.backgroundImage = ``
        document.querySelector(`#winner-${this.whoIsPlaying}`).style.visibility = 'hidden'
        this.updateRoundScoreDisplay();
        document.querySelector('.player-2-panel').classList.remove('active-2')
        document.querySelector('.player-1-panel').classList.add('active-1')
        this.img_dice.style.visibility = `visible`
        this.btn_roll.style.visibility = `visible`
        this.btn_hold.style.visibility = `visible`
    };
    this.changeLanguage = event => {
        const { value } = event.target
        const { buttons, labels, instructions } = language[value];

        this.btn_start.childNodes[1].textContent = buttons.start;
        this.btn_home.childNodes[1].textContent = buttons.home;
        this.btn_new.childNodes[1].textContent = buttons.newgame;
        this.btn_roll.childNodes[1].textContent = buttons.roll;
        this.btn_hold.childNodes[1].textContent = buttons.hold;

        this.howtoplay.textContent = labels.howtoplay;
        this.winner1.textContent = labels.player1;
        this.winner2.textContent = labels.player2;
        this.p1rolled1.textContent = labels.p1rolled1;
        this.p2rolled1.textContent = labels.p2rolled1;
        this.p1label.textContent = labels.player1;
        this.p2label.textContent = labels.player2;

        const currentArray = new Array(...this.current);
        currentArray.forEach(element => element.textContent = labels.current)

        this.ptag1.textContent = instructions.ptag1;
        this.ptag2.textContent = instructions.ptag2;
        this.ptag3.textContent = instructions.ptag3;
    };
    this.changeTheme = event => {
        const { checked } = event.target;

        const LTbg = '#f7f7f7';
        const LTred = '#eb4d4d';
        const LTfont = '#555';
        const DTbg = 'black';
        const DTred = '#f07878';
        const DTfont = '#fff';

        const body = document.body;
        const paragraphs = document.querySelectorAll('p');
        const buttons = document.querySelectorAll('button');
        const icons = document.querySelectorAll('i');
        const select_lang = document.querySelector('#language');
        const panel_lang = document.querySelector('.language-panel');
        const panel_p1 = document.querySelector('.player-1-panel');
        const panel_p2 = document.querySelector('.player-2-panel');
        const rolled_p1 = document.querySelector('#rolled1-P1');
        const rolled_p2 = document.querySelector('#rolled1-P2');
        const names = document.querySelectorAll('.player-name');

        switch (checked) {
            case true:
                body.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
                body.style.backgroundBlendMode = 'overlay'
                this.panelInitial.style.backgroundColor = DTbg;
                panel_p1.style.backgroundColor = DTbg;
                panel_p2.style.backgroundColor = DTbg;
                rolled_p1.style.color = DTfont;
                rolled_p2.style.color = DTfont;
                panel_lang.style.borderColor = DTred;
                select_lang.style.color = DTfont;
                [...paragraphs].forEach(p => p.style.color = DTfont);
                [...buttons].forEach(b => b.style.color = DTfont);
                [...icons].forEach(i => i.style.color = DTred);
                [...names].forEach(n => n.style.color = DTfont);
                break;
            case false:
                body.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                body.style.backgroundBlendMode = 'normal'
                this.panelInitial.style.backgroundColor = LTbg;
                panel_p1.style.backgroundColor = LTbg;
                panel_p2.style.backgroundColor = LTbg;
                rolled_p1.style.color = LTfont;
                rolled_p2.style.color = LTfont;
                panel_lang.style.borderColor = LTred;
                select_lang.style.color = LTfont;
                [...paragraphs].forEach(p => p.style.color = LTfont);
                [...buttons].forEach(b => b.style.color = LTfont);
                [...icons].forEach(i => i.style.color = LTred);
                [...names].forEach(n => n.style.color = LTfont);
                break;
        }
    }
}