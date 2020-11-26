const App = Application();
const PigGame = new App();

// things needed to be refreshed when user clicks the refresh button
window.addEventListener('load', function () {
    PigGame.toggler_theme.checked = false;
    PigGame.select_language.value = 'english';
    PigGame.form_p1_name.value = '';
    PigGame.form_p2_name.value = '';
    PigGame.form_target_score.value = '';
});

// event for changing the language
PigGame.select_language.addEventListener('change', PigGame.changeLanguage);

// event for changing the theme
PigGame.toggler_theme.addEventListener('change', PigGame.changeTheme);

// event for starting/restarting the game
PigGame.btn_home.addEventListener('click', PigGame.startGame);

// event for showing the form
PigGame.btn_start.addEventListener('click', PigGame.showForm);

// event for hiding the form
PigGame.btn_hideform.addEventListener('click', PigGame.hideForm);

// event for new game
PigGame.btn_new.addEventListener('click', PigGame.newGame);

// event for round score/roll button
PigGame.btn_roll.addEventListener('click', PigGame.rollDice);

// event for global score button
PigGame.btn_hold.addEventListener('click', PigGame.updateGlobalScoreDisplay);

// event for form submission and starts the game by invoking Piggame.startGame
PigGame.form.addEventListener('submit', PigGame.submitForm);

// event for the form styles
[PigGame.form_p1_name, PigGame.form_p2_name, PigGame.form_target_score]
    .forEach(element => {
        element.addEventListener('focusout', () => {
            element.value
                ? element.classList.add("has-value")
                : element.classList.remove("has-value")
        })
    })

// event for target score input to prevent typing texts
PigGame.form_target_score.addEventListener('keyup', function () {
    PigGame.areNumbers.test(this.value)
        ? PigGame.form_target_score_isvalid = true
        : null
})

// play background music with lesser volume and on-loop
PigGame.backgroundMusic.play();
PigGame.backgroundMusic.loop = true;
PigGame.backgroundMusic.volume = 0.1;

// adjust volume for sprites
PigGame.rollDiceSound.volume = 0.2;
PigGame.losePointsSound.volume = 0.2;
PigGame.addPointsSound.volume = 0.2;
PigGame.applauseSound.volume = 0.2;














// MODEL FOR APPLICATION
function Application() {
    const State = new WeakMap();

    return class Game {

        constructor() {
            State.set(this, {
                language: 'english',
                diceval: 0,
                whoIsPlaying: '1',
                target_score: 100,
                p1Name: '',
                p2Name: '',
                P1RoundScore: 0,
                P1GlobalScore: 0,
                P2RoundScore: 0,
                P2GlobalScore: 0,
                form_target_score_isvalid: false
            })
            this.areNumbers = new RegExp(/^[0-9]+$/);
            this.backgroundMusic = new Audio('/assets/audios/bensound-buddy.mp3');
            this.rollDiceSound = new Audio('/assets/audios/dice-roll.mp3');
            this.losePointsSound = new Audio('/assets/audios/lose-points.mp3');
            this.addPointsSound = new Audio('/assets/audios/add-points.mp3');
            this.applauseSound = new Audio('/assets/audios/applause.mp3')
            this.img_dice = document.querySelector('.dice');
            this.toggler_theme = document.querySelector('#theme');
            this.select_language_panel = document.querySelector('.language-panel');
            this.select_language = document.querySelector('#language');
            this.panelInitial = document.querySelector('.initial-panel');
            this.panelNavigation = document.querySelector('.initial-panel-navigation');
            this.panelForm = document.querySelector('.initial-panel-form');
            this.form = document.querySelector('form');
            this.form_p1_desc = document.querySelector('#player1_desc');
            this.form_target_desc = document.querySelector('#targetscore_desc');
            this.form_p1_name = document.querySelector("#player1_name");
            this.form_p2_name = document.querySelector("#player2_name");
            this.form_p1_namelabel = document.querySelector('#player1_name_label');
            this.form_p2_namelabel = document.querySelector('#player2_name_label');
            this.form_target_score = document.querySelector("#raceto");
            this.form_target_scorelabel = document.querySelector('#target_score_label');
            this.btn_start = document.querySelector('.btn-start');
            this.btn_home = document.querySelector('.btn-home');
            this.btn_new = document.querySelector('.btn-new');
            this.btn_roll = document.querySelector('.btn-roll');
            this.btn_hold = document.querySelector('.btn-hold');
            this.btn_target = document.querySelector('.btn-target');
            this.btn_commence = document.querySelector('#commence');
            this.btn_hideform = document.querySelector('#hideform');
            this.howtoplay = document.querySelector('.howtoplay');
            this.winner1 = document.querySelector('#winner-1');
            this.winner2 = document.querySelector('#winner-2');
            this.p1label = document.querySelector("#name-1");
            this.p2label = document.querySelector("#name-2");
            this.p1panel = document.querySelector('.player-1-panel');
            this.p2panel = document.querySelector('.player-2-panel');
            this.p1rolled1 = document.querySelector('#rolled1-P1');
            this.p2rolled1 = document.querySelector('#rolled1-P2');
            this.current = document.querySelectorAll('.player-current-label');
            this.ptag1 = document.querySelector('.ptag1');
            this.ptag2 = document.querySelector('.ptag2');
            this.ptag3 = document.querySelector('.ptag3');
        }
        calculateRoundScore = score => {
            const whoIsPlaying = State.get(this).whoIsPlaying;
            const currentPlayerRoundScore = `P${whoIsPlaying}RoundScore`
            const totalRoundScore = State.get(this)[currentPlayerRoundScore] + parseFloat(score)
            State.set(this, { ...State.get(this), [currentPlayerRoundScore]: totalRoundScore })
        };
        calculateGlobalScore = roundScore => {
            const whoIsPlaying = State.get(this).whoIsPlaying;
            const currentPlayerGlobalScore = `P${whoIsPlaying}GlobalScore`
            const totalGlobalScore = State.get(this)[currentPlayerGlobalScore] + parseFloat(roundScore)
            State.set(this, { ...State.get(this), [currentPlayerGlobalScore]: totalGlobalScore })
        };
        updateRoundScoreDisplay = () => {
            const whoIsPlaying = State.get(this).whoIsPlaying;
            const currentPlayerRoundScore = State.get(this)[`P${whoIsPlaying}RoundScore`]
            document.querySelector(`#current-${whoIsPlaying}`).textContent = currentPlayerRoundScore;
        };
        updateGlobalScoreDisplay = () => {
            this.addPointsSound.play();
            const state = State.get(this);
            const { whoIsPlaying, target_score } = state;
            const holdImage = document.querySelector(`#img-P${whoIsPlaying}-roundhold`);
            const waitingImage = document.querySelector(`#img-P${whoIsPlaying}-roundwaiting`);
            const addedScoreDisplay = document.querySelector(`#scoreadd-${whoIsPlaying}`);
            const globalScoreDisplay = document.querySelector(`#score-${whoIsPlaying}`);
            const currentPlayerGlobalScore = `P${whoIsPlaying}GlobalScore`
            const currentPlayerRoundScore = `P${whoIsPlaying}RoundScore`
            const globalScore = State.get(this)[currentPlayerGlobalScore]
            const roundScore = State.get(this)[currentPlayerRoundScore]
            const globalScoreNew = globalScore + roundScore;
            globalScoreDisplay.textContent = globalScoreNew;
            addedScoreDisplay.textContent = `+${roundScore}`
            waitingImage.style.display = 'none';
            holdImage.style.display = 'block';
            addedScoreDisplay.classList.add('slide-in-frombottom')
            holdImage.classList.add('slide-in-frombottom')
            setTimeout(() => {
                addedScoreDisplay.classList.add('slide-out-tobottom');
                holdImage.classList.add('slide-out-tobottom')
            }, 1000)
            setTimeout(() => {
                addedScoreDisplay.classList.remove('slide-in-frombottom');
                addedScoreDisplay.classList.remove('slide-out-tobottom');
                holdImage.classList.remove('slide-in-tobottom');
                holdImage.classList.remove('slide-out-tobottom');
                holdImage.style.display = 'none';
            }, 2000)
            State.set(this, { ...State.get(this), [currentPlayerGlobalScore]: globalScoreNew })
            this.updateRoundScoreDisplay();

            if (State.get(this)[currentPlayerGlobalScore] >= target_score) {
                this.applauseSound.play();
                const panel = document.querySelector(`.player-${whoIsPlaying}-panel`);
                const promptWinner = document.querySelector(`#winner-${whoIsPlaying}`);
                panel.style.backgroundImage = `url('/assets/images/winner.png')`
                promptWinner.style.visibility = `visible`
                this.img_dice.style.visibility = `hidden`
                this.btn_roll.style.visibility = `hidden`
                this.btn_hold.style.visibility = `hidden`
                return null;
            }

            this.nextPlayer();
        };
        nextPlayer = () => {
            const state = State.get(this);
            const { whoIsPlaying, diceval } = state;
            const loseRoundPropmt = document.querySelector(`#rolled1-P${whoIsPlaying}`);
            const waitingImage = document.querySelector(`#img-P${whoIsPlaying}-roundwaiting`);
            const loseImage = document.querySelector(`#img-P${whoIsPlaying}-roundlose`)

            if (diceval === 1) {
                waitingImage.style.display = 'none'
                loseImage.style.display = 'block'
                loseImage.classList.add('fade-in-top')
                loseRoundPropmt.classList.add('fade-in-top')
            }

            State.set(this, { ...State.get(this), [`P${whoIsPlaying}RoundScore`]: 0 })
            this.updateRoundScoreDisplay();

            switch (whoIsPlaying) {
                case '1':
                    State.set(this, { ...State.get(this), whoIsPlaying: '2' })
                    const case1State = State.get(this);
                    const { whoIsPlaying: case1Player } = case1State;
                    this.p1panel.classList.remove('active-1')
                    this.p2panel.classList.add('active-2');
                    document.querySelector(`#rolled1-P${case1Player}`).classList.remove('fade-in-top')
                    document.querySelector(`#img-P${case1Player}-roundwaiting`).style.display = 'block'
                    document.querySelector(`#img-P${case1Player}-roundlose`).style.display = 'none'
                    break;
                case '2':
                    State.set(this, { ...State.get(this), whoIsPlaying: '1' })
                    const case2State = State.get(this);
                    const { whoIsPlaying: case2Player } = case2State;
                    this.p2panel.classList.remove('active-2')
                    this.p1panel.classList.add('active-1');
                    document.querySelector(`#rolled1-P${case2Player}`).classList.remove('fade-in-top')
                    document.querySelector(`#img-P${case2Player}-roundwaiting`).style.display = 'block'
                    document.querySelector(`#img-P${case2Player}-roundlose`).style.display = 'none'
                    break;
            }
        };
        rollDice = () => {
            this.rollDiceSound.play();
            State.set(this, { ...State.get(this), diceval: Math.floor(Math.random() * 6) + 1 });
            const state = State.get(this);
            const { whoIsPlaying, diceval, target_score } = state;
            this.img_dice.setAttribute('src', `/assets/images/dice-${diceval}.png`);
            this.img_dice.classList.add('rotate-center')
            setTimeout(() => this.img_dice.classList.remove('rotate-center'), 250) // check css

            const globalScoreDisplay = document.querySelector(`#score-${whoIsPlaying}`);
            const currPlyrGlobalScore = State.get(this)[`P${whoIsPlaying}GlobalScore`];
            const currPlyrRoundScore = State.get(this)[`P${whoIsPlaying}RoundScore`];
            const initialGlobalScoreBeforeHold = diceval + currPlyrGlobalScore + currPlyrRoundScore
            const initialTargetScore = target_score * 0.75;

            if (initialGlobalScoreBeforeHold >= initialTargetScore && diceval !== 1) {
                globalScoreDisplay.classList.add('almost-a-winner');
                setTimeout(() => globalScoreDisplay.classList.remove('almost-a-winner'), 750)
            }

            if (diceval === 1) {
                this.losePointsSound.play();
                this.nextPlayer();
                return null;
            }

            this.calculateRoundScore(diceval);
            this.updateRoundScoreDisplay(diceval);
        };
        startGame = () => {
            this.newGame();
            const { labels } = language[State.get(this).language];
            this.panelInitial.classList.toggle('hidden');
            this.p1panel.classList.toggle('hidden');
            this.p2panel.classList.toggle('hidden');
            this.img_dice.classList.toggle('hidden');
            this.btn_home.classList.toggle('hidden');
            this.btn_new.classList.toggle('hidden');
            this.btn_roll.classList.toggle('hidden');
            this.btn_hold.classList.toggle('hidden');
            this.btn_target.classList.toggle('hidden');
            this.btn_target.childNodes[1].textContent = `${labels.raceto} ${State.get(this).target_score}`
            this.p1label.textContent = State.get(this).p1Name;
            this.p2label.textContent = State.get(this).p2Name;
            this.form_target_score_isvalid = false;
        };
        newGame = () => {
            State.set(this, {
                ...State.get(this),
                P1GlobalScore: 0, P1RoundScore: 0,
                P2RoundScore: 0, P2GlobalScore: 0,
                whoIsPlaying: '2'
            })
            let whoIsPlaying = State.get(this).whoIsPlaying;
            document.querySelector(`#score-${whoIsPlaying}`).textContent = 0;
            document.querySelector(`#rolled1-P${whoIsPlaying}`).classList.remove('fade-in-top')
            document.querySelector(`.player-${whoIsPlaying}-panel`).style.backgroundImage = ``
            document.querySelector(`#winner-${whoIsPlaying}`).style.visibility = 'hidden'
            document.querySelector(`#img-P${whoIsPlaying}-roundwaiting`).style.display = 'none'
            document.querySelector(`#img-P${whoIsPlaying}-roundlose`).style.display = 'none'
            document.querySelector(`#img-P${whoIsPlaying}-roundhold`).style.display = 'none'
            this.updateRoundScoreDisplay();
            State.set(this, { ...State.get(this), whoIsPlaying: '1' })
            whoIsPlaying = State.get(this).whoIsPlaying;
            document.querySelector(`#score-${whoIsPlaying}`).textContent = 0
            document.querySelector(`#rolled1-P${whoIsPlaying}`).classList.remove('fade-in-top')
            document.querySelector(`.player-${whoIsPlaying}-panel`).style.backgroundImage = ``
            document.querySelector(`#winner-${whoIsPlaying}`).style.visibility = 'hidden'
            document.querySelector(`#img-P${whoIsPlaying}-roundwaiting`).style.display = 'block'
            document.querySelector(`#img-P${whoIsPlaying}-roundlose`).style.display = 'none'
            document.querySelector(`#img-P${whoIsPlaying}-roundhold`).style.display = 'none'
            this.updateRoundScoreDisplay();
            this.p1panel.classList.add('active-1');
            this.p2panel.classList.remove('active-2');
            this.img_dice.style.visibility = `visible`
            this.btn_roll.style.visibility = `visible`
            this.btn_hold.style.visibility = `visible`
        };
        showForm = () => {
            this.panelNavigation.style.display = 'none';
            this.panelForm.style.display = 'flex';
        };
        hideForm = () => {
            this.panelNavigation.style.display = 'block';
            this.panelForm.style.display = 'none';
        };
        submitForm = event => {
            event.preventDefault();

            if (!this.form_p1_name.value ||
                !this.form_p2_name.value ||
                !this.form_target_score_isvalid) {
                return null;
            }

            this.panelNavigation.style.display = 'block';
            this.panelForm.style.display = 'none';

            State.set(this, {
                ...State.get(this),
                p1Name: this.form_p1_name.value,
                p2Name: this.form_p2_name.value,
                target_score: this.form_target_score.value
                    ? parseInt(this.form_target_score.value)
                    : 100
            })

            this.form.reset();
            this.startGame();
        };
        changeLanguage = event => {
            const { value } = event.target
            const state = State.get(this);
            const { target_score } = state;
            const { buttons, labels, instructions } = language[value];

            this.language = value;
            this.btn_target.childNodes[1].textContent = `${labels.raceto} ${target_score} `;
            this.btn_start.childNodes[1].textContent = buttons.start;
            this.btn_home.childNodes[1].textContent = buttons.home;
            this.btn_new.childNodes[1].textContent = buttons.newgame;
            this.btn_roll.childNodes[1].textContent = buttons.roll;
            this.btn_hold.childNodes[1].textContent = buttons.hold;

            this.howtoplay.textContent = labels.howtoplay;
            this.winner1.textContent = labels.winner;
            this.winner2.textContent = labels.winner;
            this.p1rolled1.textContent = labels.p1rolled1;
            this.p2rolled1.textContent = labels.p2rolled1;
            this.form_p1_namelabel.textContent = labels.p1namelabel;
            this.form_p2_namelabel.textContent = labels.p2namelabel;
            this.form_target_scorelabel.textContent = labels.targetscorelabel;
            this.form_p1_desc.textContent = labels.p1formlabel;
            this.form_target_desc.textContent = labels.targetscoreformlabel;
            this.btn_commence.setAttribute('value', labels.commence);
            this.btn_hideform.setAttribute('value', labels.back);

            [...this.current].forEach(element => element.textContent = labels.current)

            this.ptag1.textContent = instructions.ptag1;
            this.ptag2.textContent = instructions.ptag2;
            this.ptag3.textContent = instructions.ptag3;
        };
        changeTheme = event => {
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
            const inputs = document.querySelectorAll('input');
            const names = document.querySelectorAll('.player-name');

            switch (checked) {
                case true:
                    body.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
                    body.style.backgroundBlendMode = 'overlay'
                    this.panelInitial.style.backgroundColor = DTbg;
                    this.p1panel.style.backgroundColor = DTbg;
                    this.p2panel.style.backgroundColor = DTbg;
                    this.p1rolled1.style.color = DTfont;
                    this.p2rolled1.style.color = DTfont;
                    this.winner1.style.color = DTfont;
                    this.winner2.style.color = DTfont;
                    this.select_language_panel.style.borderColor = DTred;
                    this.select_language.style.color = DTfont;
                    [...paragraphs].forEach(p => p.style.color = DTfont);
                    [...buttons].forEach(b => b.style.color = DTfont);
                    [...icons].forEach(i => i.style.color = DTred);
                    [...names].forEach(n => n.style.color = DTfont);
                    [...inputs].forEach(i => {
                        i.style.color = DTfont;
                        i.style.borderBottomColor = DTred;
                    })
                    break;
                case false:
                    body.style.backgroundColor = 'rgba(0, 0, 0, 0)'
                    body.style.backgroundBlendMode = 'normal'
                    this.panelInitial.style.backgroundColor = LTbg;
                    this.p1panel.style.backgroundColor = LTbg;
                    this.p2panel.style.backgroundColor = LTbg;
                    this.p1rolled1.style.color = LTfont;
                    this.p2rolled1.style.color = LTfont;
                    this.winner1.style.color = LTfont;
                    this.winner2.style.color = LTfont;
                    this.select_language_panel.style.borderColor = LTred;
                    this.select_language.style.color = LTfont;
                    [...paragraphs].forEach(p => p.style.color = LTfont);
                    [...buttons].forEach(b => b.style.color = LTfont);
                    [...icons].forEach(i => i.style.color = LTred);
                    [...names].forEach(n => n.style.color = LTfont);
                    [...inputs].forEach(i => {
                        i.style.color = LTfont;
                        i.style.borderBottomColor = LTred;
                    })
                    break;
            }
        }
    }
}