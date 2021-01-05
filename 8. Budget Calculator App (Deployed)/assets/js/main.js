const BudgetApp = new function () {
    const selectType = document.querySelector('.add__type');
    const inputDesc = document.querySelector('.add__description');
    const inputAmount = document.querySelector('.add__value');
    const inputSubmit = document.querySelector('.add__btn');
    const notify = new HTMLElementToaster();

    const STATE = {
        income: new Array(),
        expenses: new Array(),
        months: [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ]
    }


    // UTILITY FUNCTION (PUBLIC): converts to local currency format
    this.toPHP = amount => {
        return new Intl.NumberFormat('fil-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount)
    }


    // UTILITY FUNCTION (PRIVATE): returns total amount of budget from arr of budget
    const getTotal = arr => {
        return arr.reduce((acc, next) => acc + next.amount, 0)
    }


    // UTILITY FUNCTION (PRIVATE): updates the overall display
    const updateDisplay = () => {
        const totalIncome = getTotal(STATE.income);
        const totalExpenses = getTotal(STATE.expenses);
        const totalBudget = totalIncome - totalExpenses;
        const totalBudgetSign = Math.sign(totalBudget) === 1 ? '+' : '';
        inputDesc.value = '';
        inputAmount.value = '';

        document.querySelector('.budget__value')
            .textContent = `${totalBudgetSign}${this.toPHP(totalBudget)}`;

        document.querySelector('.budget__income--value')
            .textContent = `+${this.toPHP(totalIncome)}`;

        document.querySelector('.budget__expenses--value')
            .textContent = `-${this.toPHP(totalExpenses)}`;

        document.querySelector('.budget__expenses--percentage')
            .textContent = totalIncome > 0
                ? `${Math.round(totalExpenses / totalIncome * 100)}%`
                : '...';

        // remove old budget items, prior updates
        document.querySelector('.income__list').innerHTML = '';
        document.querySelector('.expenses__list').innerHTML = '';

        // create new ones from the updated arrays
        STATE.income
            .forEach(inc => {
                new HTMLBudgetTag(inc.id, 'inc', inc.desc, inc.amount, totalIncome)
                document.getElementById(`budget_${inc.id}`)
                    .onclick = () => deleteBudget(inc.id)
            })

        STATE.expenses
            .forEach(exp => {
                new HTMLBudgetTag(exp.id, 'exp', exp.desc, exp.amount, totalIncome)
                document.getElementById(`budget_${exp.id}`)
                    .onclick = () => deleteBudget(exp.id)
            })
    }


    // UTILITY FUNCTION (PRIVATE): access localstorage data
    const accessLocalStorage = action => {
        switch (action) {
            case 'read': return JSON.parse(localStorage.getItem('state'));
            case 'update': localStorage.setItem('state', JSON.stringify(STATE)); break;
        }
    }


    // UTILITY FUNCTION (PRIVATE): onload of docuemnt
    const onload = () => {
        const localdata = accessLocalStorage('read');
        const date = new Date();
        const currentMonth = STATE.months[date.getMonth()];
        const currentYear = date.getFullYear();

        selectType.value = 'inc';

        document.querySelector('.budget__title--month')
            .textContent = `${currentMonth} ${currentYear}`;

        for (let key in localdata) {
            STATE[key] = localdata[key]
        }

        updateDisplay();
        notify.initialize();
    }


    // UTILITY FUNCTION (PRIVATE): onchange of select
    const onchange = event => {
        if (event.target.value === 'exp') {
            inputAmount.style.border = '1px solid red';
            inputDesc.style.border = '1px solid red';
            selectType.style.border = '1px solid red';
            inputSubmit.style.color = 'red';
            return null
        }

        inputSubmit.style.color = 'green';
        selectType.style.border = '1px solid green';
        inputAmount.style.border = '1px solid green';
        inputDesc.style.border = '1px solid green';
    }


    // UTILITY FUNCTION (PRIVATE): onkeypress for inputs
    const onkeypress = event => {
        const { target, key } = event;
        const numInput = parseInt(key)

        if (key === 'Enter') {
            return addBudget()
        }

        if (target.className === 'add__value' &&
            key !== '.' &&
            !numInput && numInput !== 0) {
            return false
        }
    }


    // PRIVATE MAIN FUNCTION: add a budget and update the DOM
    const addBudget = () => {
        const type = selectType.value;
        const desc = inputDesc.value;
        const amount = parseFloat(inputAmount.value);
        const parsedAmount = Number((amount / 100).toFixed(2)) * 100

        if (!desc || !amount)
            return notify.showMessage('Please complete the information for your budget', 'error')

        switch (true) {
            case type === 'exp':
                const newExpBudget = new Budget(parsedAmount, desc, 'exp')
                new HTMLBudgetTag(newExpBudget.id, 'exp', desc, amount, getTotal(STATE.income));
                STATE.expenses.push(newExpBudget);
                break;
            case type === 'inc':
                const newIncBudget = new Budget(parsedAmount, desc, 'inc')
                new HTMLBudgetTag(newIncBudget.id, 'inc', desc, amount, getTotal(STATE.income));
                STATE.income.push(newIncBudget)
                break;
        }

        updateDisplay();
        accessLocalStorage('update');
    }


    // PRIVATE MAIN FUNCTION: delete a budget and update the DOM
    const deleteBudget = targetId => {
        STATE.income = STATE.income.filter(inc => inc.id != targetId);
        STATE.expenses = STATE.expenses.filter(exp => exp.id != targetId);
        updateDisplay();
        accessLocalStorage('update');
    }


    // initialize listeners/notifincations
    window.onload = onload;
    selectType.onchange = onchange;
    inputSubmit.onclick = addBudget;
    [selectType, inputDesc, inputAmount].forEach(el => el.onkeypress = onkeypress)
}()
