// model for each user
class BankingAppUser {
    constructor(fullname, password) {
        this.accountCreation = new Date();
        this.accountNumber = Math.random().toString().substr(2, 10);
        this.fullname = fullname;
        this.password = password;
        this.balance = 0;
        this.transactions = new Array();
    }
}

// model for deposit transaction
class TransactDeposit {
    constructor(accountNumber, before, amount) {
        this.type = 'DEPOSIT'
        this.transactionDate = new Date().toLocaleString();
        this.accountNumber = accountNumber;
        this.balanceBeforeDeposit = before
        this.depositAmount = amount
    }
}

// model for withdraw transaction
class TransactWithdraw {
    constructor(accountNumber, before, amount) {
        this.type = 'WITHDRAW'
        this.transactionDate = new Date().toLocaleString();
        this.accountNumber = accountNumber;
        this.balanceBeforeWithdraw = before
        this.withdrawAmount = amount
    }
}

// model for send transaction
class TransactSend {
    constructor(accountNumber, before, amount, toAccountNumber, direction) {
        this.type = `SEND ${direction}`
        this.transactionDate = new Date().toLocaleString();
        this.accountNumber = accountNumber;
        this.balanceBeforeSend = before
        this.sentAmount = amount
        this.sentToAccountNumber = toAccountNumber
    }
}

// model for the banking application
class BankingApp {

    static users = new Array()
    static currentUser = null;

    static findUser = accountNumber => {
        return this.users.find(user => user.accountNumber === accountNumber)
    }

    static login = (fullname, password) => {
        this.currentUser = this.users.find(user => user.fullname === fullname && user.password === password)
    }

    static logout = () => {
        this.currentUser = null
    };

    static createUser = user => {
        const { fullname, password } = user;
        const newUser = new BankingAppUser(fullname, password);
        this.users.push(newUser);
    }

    static deposit = (accountNumber, amount) => {
        const foundUser = this.findUser(accountNumber)
        const newTransaction = new TransactDeposit(
            accountNumber, foundUser.balance, parseInt(amount)
        )
        foundUser.balance += parseInt(amount)
        foundUser.transactions.unshift(newTransaction)
    }

    static withdraw = (accountNumber, amount) => {
        const foundUser = this.findUser(accountNumber)
        const newTransaction = new TransactWithdraw(
            accountNumber, foundUser.balance, amount
        )
        foundUser.balance -= parseInt(amount);
        foundUser.transactions.unshift(newTransaction)
    }

    static send = (fromAccount, toAccount, amount) => {
        const from = this.findUser(fromAccount)
        const to = this.findUser(toAccount)
        const newTransactionFrom = new TransactSend(
            from.fullname, from.balance, amount, to.fullname, 'FROM'
        )
        const newTransactionTo = new TransactSend(
            from.fullname, to.balance, amount, to.fullname, 'TO'
        )
        from.balance -= parseInt(amount);
        from.transactions.unshift(newTransactionFrom)
        to.balance += parseInt(amount);
        to.transactions.unshift(newTransactionTo)
    }

    static getBalance = () => {
        return this.currentUser.balance;
    }

    static getAllTransactions = (type = 'ALL') => {
        return type === 'ALL'
            ? this.currentUser.transactions
            : this.currentUser.transactions.map(t => t.type === type)
    }

}

const initNavItems = document.querySelector('.initial_nav_parent');
const initNavViews = document.querySelector('.view_initial_nav_dynamic');
const initNavItemsArr = [...initNavItems.children]
const initNavViewsArr = [...initNavViews.children];

initNavItemsArr.forEach(navItem => {
    navItem.addEventListener('click', function () {

        initNavViewsArr.forEach(view => {
            navItem.dataset.view === view.dataset.view
                ? view.style.display = 'flex'
                : view.style.display = 'none'
        })

        initNavItemsArr.forEach(navItem => {
            this.dataset.view === navItem.dataset.view
                ? this.classList.add('active-nav')
                : navItem.classList.remove('active-nav')
        })

    })
})