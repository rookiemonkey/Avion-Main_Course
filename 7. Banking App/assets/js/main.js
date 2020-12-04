
// model for the banking application
class BankingApp {

    static users = new Array()
    static notifier = new HTMLElementToaster();
    static currentUser = null;
    static initialPage = document.querySelector('#view_initial')
    static loggedInPage = document.querySelector('#view_loggedin')
    static displayName = document.querySelector('#user_name').childNodes[0]
    static displayAvatar = document.getElementById('user_avatar')
    static displayAccCrt = document.querySelector('#user_accountcreation')
    static displayAccNum = document.querySelector('#user_accountnumber').childNodes[2]
    static displayBalance = document.querySelector('#user_balance').childNodes[2]
    static changeAvatarBtn = document.getElementById('user_accountAvatarChange')
    static transactionsList = document.getElementById('transactions_list')
    static transactionSelect = document.getElementById('transaction_type')
    static form_register = document.getElementById('form_register')
    static form_login = document.getElementById('form_login')
    static form_deposit = document.getElementById('form_deposit')
    static form_withdraw = document.getElementById('form_withdraw')
    static form_send = document.getElementById('form_send')

    static findUser = accountNumber => {
        return this.users.find(user => user.accountNumber === accountNumber)
    }

    static login = (fullname, password) => {
        try {
            const foundUser = this.users.find(user => {
                return user.fullname === fullname &&
                    user.password === password
            })

            if (!foundUser) throw new Error("User doesn't exists")
            this.displayName.textContent = foundUser.fullname
            this.displayAccCrt.textContent = `Member since: ${foundUser.accountCreation}`
            this.displayAccNum.textContent = ` ${foundUser.accountNumber}`
            this.displayBalance.textContent = foundUser.balance
            this.displayAvatar.setAttribute('src', foundUser.avatar)
            this.currentUser = foundUser
            this.showInitialPage(false);
            resetForms()
        }

        catch (error) {
            this.notifier.showMessage(error.message, 'error')
        }
    }

    static logout = () => {
        this.currentUser = null
        this.showInitialPage(true)
        resetForms()
    };

    static showInitialPage = toShowInitPage => {
        this.initialPage.style.display = toShowInitPage ? 'flex' : 'none';
        this.loggedInPage.style.display = toShowInitPage ? 'none' : 'flex';
    }

    static createUser = (fullname, password) => {
        const newUser = new BankingAppUser(fullname, password);
        this.users.push(newUser);
    }

    static deposit = (accountNumber, amount) => {
        const foundUser = this.findUser(accountNumber)
        const newTransaction = new Transact(
            'DEPOSIT', accountNumber, foundUser.balance, parseInt(amount)
        )
        foundUser.balance += parseInt(amount)
        foundUser.transactions.unshift(newTransaction)
        this.displayBalance.textContent = foundUser.balance
    }

    static withdraw = (accountNumber, amount) => {
        try {
            const foundUser = this.findUser(accountNumber)
            const newBalance = foundUser.balance - parseInt(amount)
            if (newBalance < 0) throw new Error('Not enough money to withdraw the amount')
            const newTransaction = new Transact(
                'WITHDRAW', accountNumber, foundUser.balance, amount
            )
            foundUser.balance = newBalance;
            foundUser.transactions.unshift(newTransaction)
            this.displayBalance.textContent = foundUser.balance
        }

        catch (error) {
            this.notifier.showMessage(error.message, 'error')
        }
    }

    static send = (fromAccount, toAccount, amount) => {
        try {
            const from = this.findUser(fromAccount)
            const to = this.findUser(toAccount)
            if (!to) throw new Error("Receiver doesn't exists")
            const newTransactionFrom = new TransactSend(
                from.accountNumber, from.balance, amount, to.accountNumber, 'TO'
            )
            const newTransactionTo = new TransactSend(
                from.accountNumber, to.balance, amount, to.accountNumber, 'FROM'
            )
            from.balance -= parseInt(amount);
            from.transactions.unshift(newTransactionFrom)
            to.balance += parseInt(amount);
            to.transactions.unshift(newTransactionTo)
            this.displayBalance.textContent = from.balance
        }

        catch (error) {
            this.notifier.showMessage(error.message, 'error')
        }
    }

    static getBalance = () => {
        return this.currentUser.balance;
    }

    static submitRegisterForm = event => {
        try {
            event.preventDefault();
            const formData = new FormData(this.form_register);
            const inputs = parseFormData(formData);
            const { reg_fullname, reg_password, reg_password_confirm } = inputs;

            const isUserExisting = this.users.findIndex(({ fullname }) => fullname === reg_fullname)

            if (reg_fullname.split(' ').length < 2)
                throw new Error("Please provide your full name")

            if (!reg_fullname || !reg_password || !reg_password_confirm)
                throw new Error("Please fill out the form")

            if (isUserExisting !== -1)
                throw new Error("User already exists")

            if (reg_password !== reg_password_confirm)
                throw new Error("Passwords doesn't match")

            this.createUser(reg_fullname, reg_password)
            this.login(reg_fullname, reg_password)
            resetForms()
        }

        catch (error) {
            this.notifier.showMessage(error.message, 'error')
        }
    }

    static submitLoginForm = event => {
        event.preventDefault();
        const formData = new FormData(this.form_login);
        const { log_fullname, log_password } = parseFormData(formData);
        this.login(log_fullname, log_password)
        resetForms()
    }

    static submitDepositForm = event => {
        event.preventDefault();
        const formData = new FormData(this.form_deposit);
        const { deposit_amount } = parseFormData(formData);
        this.deposit(this.currentUser.accountNumber, parseInt(deposit_amount))
        resetForms()
    }

    static submitWithdrawForm = event => {
        event.preventDefault();
        const formData = new FormData(this.form_withdraw);
        const { withdraw_amount } = parseFormData(formData);
        this.withdraw(this.currentUser.accountNumber, parseInt(withdraw_amount))
        resetForms()
    }

    static submitSendForm = event => {
        event.preventDefault();
        const formData = new FormData(form_send);
        const { receiver_accnum, send_amount } = parseFormData(formData);
        this.send(this.currentUser.accountNumber, receiver_accnum, parseInt(send_amount))
        resetForms()
    }

    static changeAvatar = event => {
        try {
            const [image] = event.target.files
            const regEx = new RegExp(/image\/(png|jpg|jpeg)/, 'g')
            const isImage = regEx.test(image.type)
            if (!isImage) throw new Error('We only accept images')
            const blob = URL.createObjectURL(image)
            this.currentUser.avatar = blob;
            this.displayAvatar.setAttribute('src', blob);
            resetForms()
        }

        catch (error) {
            this.notifier.showMessage(error.message, 'error')
        }
    }

    static changeTransactionType = event => {
        const transactions = new Array();
        const { value } = event.target

        value === 'ALL'
            ? transactions.push(...this.currentUser.transactions)
            : transactions.push(...this.currentUser.transactions.filter(t => t.type === value))

        this.transactionsList.innerHTML = ''; // removes all child nodes

        if (transactions.length === 0) {
            const { div } = new HTMLElementTransactionEmpty()
            this.transactionsList.appendChild(div)
            return null;
        }

        transactions.forEach(transaction => {
            const { li } = new HTMLElementTransaction(transaction)
            this.transactionsList.appendChild(li)
        })
    }
}








// ====================================================== //
// EVENT LISTENERS
// ====================================================== //

const transactionsBtn = document.getElementById('transactions');
const numberInputs = [...document.querySelectorAll('input[type=num]')]
const initNavItemsArr = [...document.querySelector('.initial_nav_parent').children];
const initNavViewsArr = [...document.querySelector('.view_initial_nav_dynamic').children];
const userActionsViewsArr = [...document.querySelector('.view_useractions').children];
const userActionsBtnsArr = [...document.querySelector('.user_actions').children, transactionsBtn];


// dynamic initial page panels for each nav buttons
initNavItemsArr.forEach(navItem => {
    navItem.addEventListener('click', function () {
        resetForms();

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

// dynamic user panels for each action buttons except logout
userActionsBtnsArr.forEach(actionBtn => {
    actionBtn.addEventListener('click', function () {
        resetForms();

        if (this.dataset.action) {

            userActionsViewsArr.forEach(view => {
                view.dataset.action === actionBtn.dataset.action
                    ? view.style.display = 'flex'
                    : view.style.display = 'none'
            });

            userActionsBtnsArr.forEach(actionBtn2 => {
                if (actionBtn2.dataset.action &&
                    actionBtn2.dataset.action !== 'transactions') {
                    this.dataset.action === actionBtn2.dataset.action
                        ? this.classList.add('active-nav')
                        : actionBtn2.classList.remove('active-nav')
                }
            })

            return null;
        }

        BankingApp.logout();
    })
})

// prevents num inputs to accept letters
numberInputs.forEach(numberInput => {
    numberInput.addEventListener('keypress', function (event) {
        try {
            const { key } = event;
            const numInput = parseInt(key)
            if (!numInput) throw new Error('Please enter numbers')
            event.returnValue = true
        }

        catch (error) {
            BankingApp.notifier.showMessage(error.message, 'error')
            event.returnValue = false
        }
    })
})

// onload initialize the notifier
document.addEventListener("DOMContentLoaded", BankingApp.notifier.initialize);

// onsubmission of register form
BankingApp.form_register.addEventListener('submit', BankingApp.submitRegisterForm)

// onsubmission of login form
BankingApp.form_login.addEventListener('submit', BankingApp.submitLoginForm)

// onsubmission fo deposit form
BankingApp.form_deposit.addEventListener('submit', BankingApp.submitDepositForm)

// onsubmission fo withdraw form
BankingApp.form_withdraw.addEventListener('submit', BankingApp.submitWithdrawForm)

// onsubmission of send money form
BankingApp.form_send.addEventListener('submit', BankingApp.submitSendForm)

// onchange of file to change the avatar
BankingApp.changeAvatarBtn.addEventListener('change', BankingApp.changeAvatar)

// onchange of transaction type select options
BankingApp.transactionSelect.addEventListener('change', BankingApp.changeTransactionType)





// ====================================================== //
// HELPER FUNCTIONS 
// ====================================================== //
function parseFormData(formData) {
    const formdataParsed = {};

    [...formData].forEach(formitem => {
        formdataParsed[formitem[0]] = formitem[1]
    });

    return formdataParsed;
}

function resetForms() {
    BankingApp.form_register.reset();
    BankingApp.form_login.reset();
    BankingApp.form_deposit.reset();
    BankingApp.form_withdraw.reset();
    BankingApp.form_send.reset();
    BankingApp.changeAvatarBtn.value = '';
    BankingApp.transactionSelect.value = 'All';
    BankingApp.transactionsList.innerHTML = '';
}










// ====================================================== //
// MODELS
// ====================================================== //
// model for each user
function BankingAppUser(fullname, password) {
    this.accountCreation = new Date().toDateString();
    this.accountNumber = Math.random().toString().substr(2, 10);
    this.fullname = fullname;
    this.password = password;
    this.balance = 0;
    this.transactions = new Array();
    this.avatar = `/assets/images/default.jpg`;
}

// model for deposit/withdraw transactions
function Transact(type, accountNumber, before, amount) {
    this.type = type // 'DEPOSIT' or 'WITHDRAW'
    this.transactionDate = new Date().toDateString();
    this.accountNumber = accountNumber;
    this.balanceBefore = before
    this.amount = amount
}

// model for send transaction
function TransactSend(accountNumber, before, amount, toAccountNumber, direction) {
    this.type = `SENT ${direction}`
    this.transactionDate = new Date().toDateString();
    this.accountNumber = accountNumber;
    this.balanceBefore = before
    this.amount = amount
    this.sentToOrFromAccountNumber = toAccountNumber
}

// ELEMENT model for a transaction item
function HTMLElementTransaction(transaction) {
    this.li = document.createElement("LI");
    this.spanDate = document.createElement("SPAN");
    this.spanBalanceBefore = document.createElement("SPAN");
    this.mainContentType = document.createElement("SPAN");
    this.mainContentAmount = document.createElement("SPAN");
    this.mainContent = document.createElement("P");
    this.li.classList.add('transactions_listitem');
    this.spanDate.classList.add('transactions_listitem_date')
    this.spanDate.textContent = transaction.transactionDate
    this.spanBalanceBefore.classList.add('transactions_listitem_balanceBefore')
    this.spanBalanceBefore.textContent = `Balance before this transaction: ${transaction.balanceBefore}`
    this.mainContent.classList.add('transactions_listitem_main')
    this.mainContentType.classList.add('transactions_listitem_type')
    this.mainContentAmount.classList.add('transactions_listitem_amount')
    this.mainContentType.textContent = transaction.type == 'SENT TO' ||
        transaction.type == 'SENT FROM'
        ? `${transaction.type} ${transaction.sentToOrFromAccountNumber}`
        : transaction.type
    this.mainContentAmount.textContent = transaction.amount
    this.mainContent.appendChild(this.mainContentType)
    this.mainContent.appendChild(this.mainContentAmount)
    this.li.appendChild(this.spanDate)
    this.li.appendChild(this.spanBalanceBefore)
    this.li.appendChild(this.mainContent)
}

// ELEMENT model for empty transaction
function HTMLElementTransactionEmpty() {
    this.div = document.createElement("DIV")
    this.img = document.createElement("IMG")
    this.msg = document.createElement("H3")
    this.div.classList.add('transactions_list_empty')
    this.img.setAttribute('src', '/assets/images/empty.svg')
    this.msg.textContent = `No results found for the query`
    this.div.appendChild(this.msg)
    this.div.appendChild(this.img)
}

// ELEMENT model for toast notifications
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