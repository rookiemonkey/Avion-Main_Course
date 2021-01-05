(function Application() {

    const winningCombinations = {
        1: ['1-1', '1-2', '1-3'],
        2: ['2-1', '2-2', '2-3'],
        3: ['3-1', '3-2', '3-3'],
        4: ['1-1', '2-1', '3-1'],
        5: ['1-2', '2-2', '3-2'],
        6: ['1-3', '2-3', '3-3'],
        7: ['1-1', '2-2', '3-3'],
        8: ['1-3', '2-2', '3-1']
    }

    const state = {
        started: true,
        player: 'X',
        XCoors: new Array(),
        OCoors: new Array()
    }

    const display = document.getElementById('display');
    const restart_btn = document.getElementById('restart');
    const grids = [...document.getElementById('container-grid').children];
    const applause = new Audio('./assets/audios/applause.mp3');
    const background = new Audio('./assets/audios/background.mp3');
    const notify = new HTMLElementToaster();


    function nextPlayer() {
        if (state.player === 'X') {
            state.player = 'O'
            return display.textContent = 'O is Playing';
        }

        state.player = 'X'
        display.textContent = 'X is Playing';
    }



    function winner() {
        applause.play();
        state.started = false;
        display.textContent = `Winner is ${state.player}!`
        notify.showMessage(`Hooray! ${state.player} is the winner`, 'success')
        grids.forEach(grid => {
            grid.classList.add('cell-occupied')
            grid.classList.remove('hoverable')
        })
    }



    function tie() {
        state.started = false;
        display.textContent = `Tie Game!`
        notify.showMessage(`Owwww! It's a tie game!`, 'warning')
        grids.forEach(grid => {
            grid.classList.add('cell-occupied')
            grid.classList.remove('hoverable')
        })
    }



    function restart() {
        state.started = true;
        state.player = 'X';
        state.XCoors = new Array();
        state.OCoors = new Array();
        display.textContent = 'X is Playing';
        notify.clearMessage();
        grids.forEach(grid => {
            grid.textContent = ''
            grid.className = 'cell hoverable'
        })
    }



    function styleWinningGrids(combinationNum) {

        if (!winningCombinations[combinationNum])
            return null;

        const combinations = winningCombinations[combinationNum]

        combinations.forEach(combi => {

            const [row, col] = combi.split('-');

            const target = document.querySelector(`[data-coor='${row}-${col}']`);

            target.classList.add('winningrid')

        })

    }



    function checkGrids() {

        const analysis = new Object;

        // loop to each winning combinations
        for (let key in winningCombinations) {

            // check if each coor in a winnin combi array is present in the 
            // current player's answer array of coordinates
            analysis[key] = winningCombinations[key]
                .every(combi =>
                    state[`${state.player}Coors`].some(answer => answer == combi))

        }

        // get the values and and index of true + 1 relative to winningCombinations
        const values = Object.values(analysis)
        const winningCombination = values.indexOf(true) + 1;

        // check if all grids are filled regardless who is state.player
        const areAllFilled = grids.every(grid => Boolean(grid.textContent))

        // style grid row,col,diag that will return true
        styleWinningGrids(winningCombination)

        // if all filled but no row,col,diags hasTheSame
        if (areAllFilled && !winningCombination)
            return `TIE`

        // else return Bollean context of >= 1 (true) or 0 (false)
        return Boolean(winningCombination);
    }



    function onclickGrid(grid) {

        if (state.started && !grid.classList.contains('cell-occupied')) {
            const coor = grid.getAttribute('data-coor');
            const [row, col] = coor.split('-');
            state[`${state.player}Coors`].push(`${row}-${col}`);

            grid.textContent = state.player;
            grid.classList.remove('hoverable');
            grid.classList.add('cell-occupied');
            grid.classList.add(`${state.player}`);

            const hasWon = checkGrids();

            if (hasWon === 'TIE') return tie();
            if (hasWon) return winner();
            if (!hasWon) return nextPlayer();
        }

        if (!state.started)
            notify.showMessage('Please restart the game', 'error')

    }



    function onhoverGrid(grid) {

        if (!grid.classList.contains('cell-occupied')) {
            grid.innerHTML = `<span class="shadow">${state.player}</span>`
        }

    }



    function onleaveGrid(grid) {

        if (!grid.classList.contains('cell-occupied')) {
            document.querySelector('.shadow').remove();
        }

    }



    function HTMLElementToaster() {

        this.initialize = () => {
            this.hideTimeout = null;
            this.element = document.createElement("div");
            this.element.className = "toast";
            document.body.appendChild(this.element);
        }

        this.showMessage = (message, state) => {
            clearTimeout(this.hideTimeout);
            this.element.textContent = message;
            this.element.className = "toast toast--visible";

            if (state) {
                this.element.classList.add(`toast--${state}`);
            }

            this.hideTimeout = setTimeout(() => {
                this.element.classList.remove("toast--visible");
            }, 3000);
        }

        this.clearMessage = () => {
            clearTimeout(this.hideTimeout)
            this.element.classList.remove("toast--visible");
        }
    }



    window.onload = () => {

        // initiate audio elements
        background.play();
        background.loop = true;
        background.volume = 0.075;
        applause.volume = 0.08;

        // initiate toaster element
        notify.initialize();

        // attach event listener for restart
        restart_btn.onclick = restart;

        // attach event listeners for each grid
        grids.forEach(grid => {

            // attach an onclick event listener to each grid
            grid.onclick = () => onclickGrid(grid)

            // attach an onmouseover event listener to each grid
            grid.onmouseenter = () => onhoverGrid(grid)

            // attach an onmouseover event listener to each grid
            grid.onmouseleave = () => onleaveGrid(grid)

        });

    }

})()