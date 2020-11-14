const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


// parse the HTML file into a string format with correct encoding
const options = { encoding: 'utf8', flag: 'r' };
const parsedHTML = fs.readFileSync(__dirname + "/../index.html", options)



// pass in the parsedHTML to jsdom to simulate a virtual browser
// destructure needed variables such as window and document
const { window } = new JSDOM(parsedHTML)
const { document } = window;


// proceed with testing the dom
describe('CALCULATOR APPLICATION', function () {

    // select necessary virtual dom elements to test
    const calculator = document.querySelector('.calculator');
    const keys = document.querySelector('.calculator__keys');
    const display = document.querySelector('.calculator__display');

    // select needed buttons PS:sorry if i used filter a lot, cant think of a better way
    const buttons = Array.from(keys.children);
    const [clear] = buttons.filter(button => button.dataset.action === 'clear')
    const [decimal] = buttons.filter(button => button.dataset.action === 'decimal')
    const [plus] = buttons.filter(button => button.dataset.action === 'add')
    const [minus] = buttons.filter(button => button.dataset.action === 'subtract')
    const [times] = buttons.filter(button => button.dataset.action === 'multiply')
    const [divide] = buttons.filter(button => button.dataset.action === 'divide')
    const [equals] = buttons.filter(button => button.dataset.action === 'calculate')
    const [one] = buttons.filter(button => button.innerHTML === '1')
    const [two] = buttons.filter(button => button.innerHTML === '2')
    const [three] = buttons.filter(button => button.innerHTML === '3')
    const [four] = buttons.filter(button => button.innerHTML === '4')
    const [five] = buttons.filter(button => button.innerHTML === '5')
    const [nine] = buttons.filter(button => button.innerHTML === '9')











    //! PLEASE READ :)

    /**
     * PROJECT GUIDE HERE: https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
     * 
     * This test uses the premade html/css from the freecodecamp project 
     * and should work unless the ff:
     *      - we changed the class names
     *      - we changed the textContents such as the operator symbols
     * 
     * if we change some of those, we might need to change some of the above this comment
     * which selects the necessary DOM elements to perform the test suites.
     */


    // PASTE YOUR keys.addEventListener and calculate function or other helper functions
    // between the commented lines BELOW. The rest, Please dont change anything
    // =========================================================//

    /**
     * THESE ARE AUTOMATICALLY DEFINED FOR YOU ABOVE on Line 21
     * const calculator = document.querySelector('.calculator');
     * const keys = document.querySelector('.calculator__keys');
     * const display = document.querySelector('.calculator__display');
     */

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

    // =========================================================//
    // PASTE YOUR keys.addEventListener and calculate function or other helper functions
    // between the commented lines ABOVE. The rest, Please dont change anything





































































































    // BELOW ARE THE TEST SUITES. PLEASE DO NOT CHANGE ANYTHING //

    test('Should be able to return a number (Calculate function)', function () {
        const result = calculate('1', 'add', '1')
        expect(typeof result).toBe('number');
    })


    test('Should be able to change the operator if a different operator is clicked after the other', function () {

        clear.click();
        five.click();
        plus.click();
        minus.click();

        const { dataset } = calculator;
        let isIt;

        if (dataset.operator === 'subtract') {
            isIt = true;
        } else {
            isIt = false;
        }

        expect(isIt).toBe(true)
    })

    test('Should be able to append a decimal to the resulting number after equal is clicked. (eg: 5 + 5 = . should return "10.")', function () {

        clear.click();
        five.click();
        plus.click();
        five.click();
        equals.click();
        decimal.click();

        expect(display.textContent).toBe('10.')
    });

    test('Should be able to clear the dataset object when AC/CE are clicked (except previous key type)', function () {

        clear.click();

        // dataset fields to be cleared
        const { firstValue, modValue, operator } = calculator.dataset;
        const datasetArray = [firstValue, modValue, operator];
        const areCleared = datasetArray.every(field => !Boolean(field))

        expect(areCleared).toBe(true);
    })


    test('Should not show multiple decimal points', function () {

        decimal.click();
        decimal.click();
        decimal.click();
        decimal.click();
        decimal.click();
        decimal.click();

        expect(display.textContent).toBe('0.')

    })

    test('Should not change anything if an operator key is clicked multiple times', function () {

        clear.click();
        five.click();
        plus.click();
        plus.click();
        plus.click();
        plus.click();

        const { dataset } = calculator;
        let isIt;

        if (
            dataset.previousKeyType === 'operator' &&
            dataset.firstValue === '5' &&
            dataset.operator === 'add'
        ) {
            isIt = true;
        } else {
            isIt = false;
        }

        expect(isIt).toBe(true)
    })

    test('Should not calculate when operator is clicked once after equals', function () {

        clear.click();
        one.click();
        plus.click();
        one.click();
        equals.click();
        minus.click();

        expect(display.textContent).toBe('2')
    })

    test('Should not calculate when operator is clicked twice or more after equals', function () {

        clear.click();
        one.click();
        plus.click();
        one.click();
        equals.click();
        minus.click();
        minus.click();

        expect(display.textContent).toBe('2')
    })


    test('BASIC OPERATIONS: 5 + 5 = 10', function () {

        clear.click();
        five.click();
        plus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('10')
    });

    test('BASIC OPERATIONS: 5 - 5 = 0', function () {

        clear.click();
        five.click();
        minus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('0')
    });

    test('BASIC OPERATIONS: 5 * 5 = 25', function () {

        clear.click();
        five.click();
        times.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('25')
    });

    test('BASIC OPERATIONS: 5 / 5 = 1', function () {

        clear.click();
        five.click();
        divide.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('1')
    });



    test('FIRST NUMBER FLOAT OPERATIONS: 5.5 + 5 = 10.5', function () {

        clear.click();
        five.click();
        decimal.click();
        five.click();
        plus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('10.5')
    })

    test('FIRST NUMBER FLOAT OPERATIONS: 5.5 - 5 = 0.5', function () {

        clear.click();
        five.click();
        decimal.click();
        five.click();
        minus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('0.5')
    })

    test('FIRST NUMBER FLOAT OPERATIONS: 5.5 * 5 = 27.5', function () {

        clear.click();
        five.click();
        decimal.click();
        five.click();
        times.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('27.5')
    })

    test('FIRST NUMBER FLOAT OPERATIONS: 5.5 / 5 = 1.1', function () {

        clear.click();
        five.click();
        decimal.click();
        five.click();
        divide.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('1.1')
    })



    test('SECOND NUMBER FLOAT OPERATIONS: 5 + 5.5 = 10.5', function () {

        clear.click();
        five.click();
        plus.click();
        five.click();
        decimal.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('10.5')
    })

    test('SECOND NUMBER FLOAT OPERATIONS: 5 - 5.5 = -0.5', function () {

        clear.click();
        five.click();
        minus.click();
        five.click();
        decimal.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('-0.5')
    })

    test('SECOND NUMBER FLOAT OPERATIONS: 5 * 5.5 = 27.5', function () {

        clear.click();
        five.click();
        times.click();
        five.click();
        decimal.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('27.5')
    })

    test('SECOND NUMBER FLOAT OPERATIONS: 5 / 5.5 = 0.90909..', function () {

        clear.click();
        five.click();
        divide.click();
        five.click();
        decimal.click();
        five.click();
        equals.click();

        const isIt = display.textContent.includes('0.90909');

        expect(isIt).toBe(true)
    })



    test('ADVANCED OPERATIONS (Operator followed by an Equal Sign): 5 + = should return 10 (5+5=10)', function () {

        clear.click();
        five.click();
        plus.click();
        equals.click();

        expect(display.textContent).toBe('10');

    })

    test('ADVANCED OPERATIONS (Operator followed by an Equal Sign): 5 - = should return 0 (5-5=0)', function () {

        clear.click();
        five.click();
        minus.click();
        equals.click();

        expect(display.textContent).toBe('0');

    })

    test('ADVANCED OPERATIONS (Operator followed by an Equal Sign): 5 * = should return 25 (5*5=25)', function () {

        clear.click();
        five.click();
        times.click();
        equals.click();

        expect(display.textContent).toBe('25');

    })

    test('ADVANCED OPERATIONS (Operator followed by an Equal Sign): 5 / = should return 1 (5/5=25)', function () {

        clear.click();
        five.click();
        divide.click();
        equals.click();

        expect(display.textContent).toBe('1');

    })



    test('ADVANCED OPERATIONS (Operator followed by 5 Equal Signs): 5 + = = = = = should return 30 (same with 5+5+5+5+5+5)', function () {

        clear.click();
        five.click();
        plus.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('30')
    })

    test('ADVANCED OPERATIONS (Operator followed by 5 Equal Signs): 5 - = = = = = should return -20 (same with 5-5-5-5-5-5)', function () {

        clear.click();
        five.click();
        minus.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('-20')
    })

    test('ADVANCED OPERATIONS (Operator followed by 5 Equal Signs): 5 * = = = = = should return 15625 (same with 5*5*5*5*5*5)', function () {

        clear.click();
        five.click();
        times.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('15625')
    })

    test('ADVANCED OPERATIONS (Operator followed by 5 Equal Signs): 5 / = = = = = should return 0.0016 (same with 5/5/5/5/5/5)', function () {

        clear.click();
        five.click();
        divide.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('0.0016')
    })



    test('ADVANCED OPERATIONS (Operator followed by 2 then 5 Equal Signs): 5 + 2 = = = = = should return 15', function () {

        clear.click();
        five.click();
        plus.click();
        two.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('15')
    })

    test('ADVANCED OPERATIONS (Operator followed by 2 then 5 Equal Signs): 5 - 2 = = = = = should return -5', function () {

        clear.click();
        five.click();
        minus.click();
        two.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('-5')
    })

    test('ADVANCED OPERATIONS (Operator followed by 2 then 5 Equal Signs): 5 * 2 = = = = = should return 160', function () {

        clear.click();
        five.click();
        times.click();
        two.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('160')
    })

    test('ADVANCED OPERATIONS (Operator followed by 2 then 5 Equal Signs): 5 / 2 = = = = = should return 0.15625', function () {

        clear.click();
        five.click();
        divide.click();
        two.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();
        equals.click();

        expect(display.textContent).toBe('0.15625')
    })



    test('ADVANCED OPERATIONS (Consecutive + Operators): 99+1+2+3+4+5= should return 114', function () {

        clear.click();
        nine.click();
        nine.click();
        plus.click();
        one.click();
        plus.click();
        two.click();
        plus.click();
        three.click();
        plus.click();
        four.click();
        plus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('114');

    })

    test('ADVANCED OPERATIONS (Consecutive - Operators): 99-1-2-3-4-5= should return 84', function () {

        clear.click();
        nine.click();
        nine.click();
        minus.click();
        one.click();
        minus.click();
        two.click();
        minus.click();
        three.click();
        minus.click();
        four.click();
        minus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('84');

    })

    test('ADVANCED OPERATIONS (Consecutive * Operators): 99*1*2*3*4*5= should return 11880', function () {

        clear.click();
        nine.click();
        nine.click();
        times.click();
        one.click();
        times.click();
        two.click();
        times.click();
        three.click();
        times.click();
        four.click();
        times.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('11880');

    })

    test('ADVANCED OPERATIONS (Consecutive / Operators): 99/1/2/3/4/5= should return 0.825', function () {

        clear.click();
        nine.click();
        nine.click();
        divide.click();
        one.click();
        divide.click();
        two.click();
        divide.click();
        three.click();
        divide.click();
        four.click();
        divide.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('0.825');

    })



    test('ADVANCED OPERATIONS (Consecutive random Operators. + first): 99+1-2*3/4+5= should return 78.5', function () {

        clear.click();
        nine.click();
        nine.click();
        plus.click();
        one.click();
        minus.click();
        two.click();
        times.click();
        three.click();
        divide.click();
        four.click();
        plus.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('78.5');

    })

    test('ADVANCED OPERATIONS (Consecutive random Operators. - first): 99-1*2/3+4-5= should return 64.33...', function () {

        clear.click();
        nine.click();
        nine.click();
        minus.click();
        one.click();
        times.click();
        two.click();
        divide.click();
        three.click();
        plus.click();
        four.click();
        minus.click();
        five.click();
        equals.click();

        const isIt = display.textContent.includes('64.33');

        expect(isIt).toBe(true);

    })

    test('ADVANCED OPERATIONS (Consecutive random Operators. * first): 99*1/2+3-4*5= should return 242.5', function () {

        clear.click();
        nine.click();
        nine.click();
        times.click();
        one.click();
        divide.click();
        two.click();
        plus.click();
        three.click();
        minus.click();
        four.click();
        times.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('242.5');

    })

    test('ADVANCED OPERATIONS (Consecutive random Operators. / first): 99/1+2-3*4/5= should return 78.4', function () {

        clear.click();
        nine.click();
        nine.click();
        divide.click();
        one.click();
        plus.click();
        two.click();
        minus.click();
        three.click();
        times.click();
        four.click();
        divide.click();
        five.click();
        equals.click();

        expect(display.textContent).toBe('78.4');

    })

})
