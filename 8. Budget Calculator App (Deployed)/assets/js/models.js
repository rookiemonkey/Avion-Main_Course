// Model for BUDGET
function Budget(amount, desc, type) {
    this.id = Date.now();
    this.type = type;
    this.amount = amount;
    this.desc = desc;
}

// Model for BUDGET elements type: exp or inc
function HTMLBudgetTag(id, type, desc, amount, currentIncome) {

    // create the parent element
    const container = document.createElement('div');
    container.classList.add('item');
    container.classList.add('clearfix');
    container.id = id;

    switch (true) {
        case type == 'inc':
            container.innerHTML = `
                <div class="item__description">${desc}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${BudgetApp.toPHP(amount)}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn" id="budget_${id}">
                            <i class="ion-ios-close-outline"></i>
                        </button>
                    </div>
                </div>
            `

            document.querySelector('.income__list').appendChild(container);
            break;



        case type == 'exp':
            container.innerHTML = `
                <div class="item__description">${desc}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${BudgetApp.toPHP(amount)}</div>
                    <div class="item__percentage">
                    ${currentIncome > 0
                    ? Math.round(amount / currentIncome * 100) + '%'
                    : '...'}
                </div>
                    <div class="item__delete">
                        <button class="item__delete--btn" id="budget_${id}">
                            <i class="ion-ios-close-outline"></i>
                        </button>
                    </div>
                </div>
            `

            document.querySelector('.expenses__list').appendChild(container);
            break;



        default:
            alert('Wrong argument was passed into HTMLBudgetTag!')
    }
}

// MODEL for toast notifications
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
}