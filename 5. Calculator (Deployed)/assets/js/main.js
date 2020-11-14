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

            // BUG FIX: cannot do operations with float number as second number
            // if (displayedNum === '0.') {
            //     display.textContent = displayedNum + keyContent
            //     return null
            // }

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




        // !EQUAL KEY
        if (action === 'calculate') {
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