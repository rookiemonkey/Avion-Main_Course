const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');


keys.addEventListener('click', event => {
    // !GLOBAL BUTTON
    if (event.target.matches('button')) {

        const key = event.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType




        // !Remove .is-depressed class from all keys especially operator keys
        Array
            .from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))




        // !NUMBER KEY
        if (!action) {

            if (displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else if (previousKeyType === 'decimal') {
                display.textContent = displayedNum + keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

            calculator.dataset.previousKeyType = 'number'
        }




        // !OPERATOR KEY
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue &&
                operator &&
                previousKeyType === 'number'
            ) {
                const calcvalue = calculate(firstValue, operator, secondValue)
                display.textContent = calcvalue
                calculator.dataset.firstValue = calcvalue
            } else {
                // If there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add('is-depressed')
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'
        }




        // !DECIMAL KEY
        if (action === 'decimal') {

            if (!displayedNum.includes('.') && previousKeyType !== 'operator') {
                display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate') {
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'
        }




        // !CLEAR KEY
        if (action === 'clear') {
            if (key.textContent === 'CE') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
                key.textContent = 'AC'
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        } else {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }




        // !SIGN KEY
        if (action === 'sign') {

            // exponent
            if (displayedNum.includes('^')) {
                const position = displayedNum.indexOf('^')
                const toArray = displayedNum.split('');

                // check if there is already a negative for the exponent
                if (displayedNum.lastIndexOf('-') > position) {
                    // remove negative for exponent
                    const lastPart = toArray.splice(position + 1)
                    lastPart.shift(); // index 0 is the exponent neg sign
                    const removedSign = [...toArray, ...lastPart]
                    display.textContent = removedSign.join('');
                } else {
                    // append negative for exponent
                    const lastPart = toArray.splice(position + 1)
                    const appendedSign = [...toArray, '-', ...lastPart]
                    display.textContent = appendedSign.join('');
                }

                calculator.dataset.previousKeyType = 'sign'
                return null
            }

            if (displayedNum.charAt(0) === '0') {
                // if 0, just append a negative sign
                display.textContent = '-'
            }

            else if (displayedNum.charAt(0) !== '-' && previousKeyType !== 'operator') {
                // append the positive sign at the beginning
                display.textContent = '-' + displayedNum
            }

            else if (displayedNum.charAt(0) === '-' && previousKeyType !== 'operator') {
                // remove the negative sign
                display.textContent = displayedNum.substring(1)
            }

            else if (previousKeyType === 'operator') {
                // this is for the second value incase of consecutive calcs
                display.textContent = '-'
            }

            if (display.textContent === '') {
                display.textContent = '0'
            }

            calculator.dataset.previousKeyType = 'sign'
        }


        // !SQUARED KEY
        if (action === 'squared' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent)) {
            const parsedDisplayNum = parseFloat(displayedNum);
            const squared = Math.pow(parsedDisplayNum, 2);

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = squared;
            display.textContent = squared;
        }


        // !CUBE KEY
        if (action === 'cube' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent)) {

            const parsedDisplayNum = parseFloat(displayedNum);
            const cube = Math.pow(parsedDisplayNum, 3);

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = cube;
            display.textContent = cube;
        }


        // !FACTORIAL KEY
        if (action === 'factorial' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent
            )) {

            const parsedDisplayNum = parseFloat(displayedNum);
            const result = factorial(parsedDisplayNum);

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = result;
            display.textContent = result;
        }



        // !FRACTION KEY
        if (action === 'fraction' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent
            )) {

            const parsedDisplayNum = parseFloat(displayedNum);
            const result = 1 / parsedDisplayNum;

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = result;
            display.textContent = result;
        }



        // !SQUARE ROOT KEY
        if (action === 'squareroot' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent
            )) {

            const parsedDisplayNum = parseFloat(displayedNum);
            const result = Math.sqrt(parsedDisplayNum);

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = result;
            display.textContent = result;
        }



        // !CUBE ROOT KEY
        if (action === 'cuberoot' &&
            (previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent
            )) {

            const parsedDisplayNum = parseFloat(displayedNum);
            const result = Math.cbrt(parsedDisplayNum);

            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            calculator.dataset.firstValue = result;
            display.textContent = result;
        }



        // !EXPONENT KEY
        if (action === 'exponent' &&
            (
                previousKeyType === 'number' ||
                previousKeyType === 'calculate' ||
                display.textContent
            ) &&
            !displayedNum.includes('^')) {

            // only adds ^ if not existing, calculation will be on equals
            display.textContent = displayedNum + "^";
            calculator.dataset.previousKeyType = 'exponent'
            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
        }




        // !EQUAL KEY
        if (action === 'calculate' && calculator.dataset.operator) {
            let firstValue = calculator.dataset.firstValue
            let secondValue = displayedNum;
            const operator = calculator.dataset.operator

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue == 0 ? '' : secondValue;
            calculator.dataset.previousKeyType = 'calculate'
        }

        // !EQUAL KEY for EXPONENTS
        if (action === 'calculate' && displayedNum.includes('^')) {
            const [base, exponent] = displayedNum.split('^')
            const base_parsed = parseFloat(base);
            const exponent_parsed = parseFloat(exponent);
            const result = Math.pow(base_parsed, exponent_parsed);
            calculator.dataset.firstValue = result;
            display.textContent = result;
        }
    }
})


// calculates equation entered by the user
const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

// returns the factorial of a number
function factorial(num) {
    if (parseFloat(num) < 0 || !num) return NaN;

    let arr = [];

    for (let i = 0; i < parseFloat(num); i++) {
        arr.push(i + 1);
    }

    return arr.reduce((prev, next) => prev * next, 1);
}