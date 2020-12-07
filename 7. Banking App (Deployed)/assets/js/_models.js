// ====================================================== //
// MODELS
// ====================================================== //

// model for the banking application
function Application() {

    // #prop for classes is not yet supported to all browsers, 
    // private vars are impelemented with local scoping instead
    // though can be viewed when Application.toString() is invoked
    const secret = 'This application is still not secure :D';
    const users = new Array();
    let currentUser = null;

    return class App {

        static notifier = new HTMLElementToaster();
        static initialPage = document.getElementById('view_initial')
        static loggedInPage = document.getElementById('view_loggedin')
        static displayName = document.getElementById('name')
        static displayAvatar = document.getElementById('user_avatar')
        static displayAccCrt = document.getElementById('user_accountcreation')
        static displayAccNum = document.getElementById('accountnumber')
        static displayBalance = document.getElementById('balance')
        static changeAvatarBtn = document.getElementById('user_accountAvatarChange')
        static accountEditModal = document.getElementById("accountedit_modal")
        static accountEditModalBtn = document.getElementById("editaccount")
        static accountEditModalBtnClose = document.getElementById("closeaccountedit_modal")
        static getBankStatementBtn = document.getElementById('bankstatement')
        static transactionsList = document.getElementById('transactions_list')
        static transactionSelect = document.getElementById('transaction_type')
        static form_register = document.getElementById('form_register')
        static form_login = document.getElementById('form_login')
        static form_deposit = document.getElementById('form_deposit')
        static form_withdraw = document.getElementById('form_withdraw')
        static form_send = document.getElementById('form_send')
        static form_changepassword = document.getElementById('form_changepassword')

        static showAccountEditModal = () => {
            this.accountEditModal.style.display === 'none'
                ? this.accountEditModal.style.display = 'block'
                : this.accountEditModal.style.display = 'none'
        }

        static login = (fullname, password) => {
            const foundUser = users.find(user => {
                const decryptedPassword = CryptoJS
                    .AES.decrypt(user.password, secret).toString(CryptoJS.enc.Utf8)

                return user.fullname === fullname &&
                    decryptedPassword === password
            })

            if (!foundUser)
                return this.notifier.showMessage("User doesn't exists", 'error')

            this.displayName.textContent = foundUser.fullname
            this.displayAccCrt.textContent = `Member since: ${foundUser.accountCreation}`
            this.displayAccNum.textContent = ` ${foundUser.accountNumber}`
            this.displayBalance.textContent = withCommas(foundUser.balance)
            this.displayAvatar.setAttribute('src', foundUser.avatar)
            currentUser = foundUser
            this.showInitialPage(false);
            resetForms()
        }

        static logout = () => {
            currentUser = null
            this.showInitialPage(true)
            this.resetLoggedInPage()
            this.notifier.showMessage('Successfully logged out', 'success')
            resetForms()
        };

        static showInitialPage = toShowInitPage => {
            this.initialPage.style.display = toShowInitPage ? 'flex' : 'none';
            this.loggedInPage.style.display = toShowInitPage ? 'none' : 'flex';
        }

        static resetLoggedInPage = () => {
            const transactionsBtn = document.getElementById('transactions');
            const userActionsParent = document.querySelector('.user_actions');
            const userActionsViewsParent = document.querySelector('.view_useractions');
            const userActionsViewsArr = [...userActionsViewsParent.children];
            const userActionsBtnsArr = [...userActionsParent.children, transactionsBtn];

            userActionsBtnsArr.forEach(actionBtn2 => {
                actionBtn2.dataset.action === 'deposit'
                    ? actionBtn2.classList.add('active-nav')
                    : actionBtn2.classList.remove('active-nav')
            })

            userActionsViewsArr.forEach(actionView => {
                actionView.dataset.action === 'deposit'
                    ? actionView.style.display = 'flex'
                    : actionView.style.display = 'none'
            })
        }

        static createUser = (fullname, password) => {
            const encryptedPassword = CryptoJS.AES.encrypt(password, secret).toString()
            const newUser = new BankingAppUser(fullname, encryptedPassword);
            users.push(newUser);
            this.notifier.showMessage('Successfully created your bank account!', 'success')
        }

        static deposit = amount => {
            const newTransaction = new Transact(
                'DEPOSIT', currentUser.accountNumber,
                currentUser.balance, parseInt(amount)
            )

            currentUser.balance += parseInt(amount)
            currentUser.transactions.unshift(newTransaction)
            this.displayBalance.textContent = withCommas(currentUser.balance)
            this.notifier.showMessage(`Successfully deposited $${amount} to your account!`, 'success')
        }

        static withdraw = amount => {
            const newBalance = currentUser.balance - parseInt(amount)

            if (newBalance < 0)
                return this.notifier.showMessage('Not enough money to withdraw the amount', 'error')

            const newTransaction = new Transact(
                'WITHDRAW', currentUser.accountNumber,
                currentUser.balance, amount
            )

            currentUser.balance = newBalance;
            currentUser.transactions.unshift(newTransaction)
            this.displayBalance.textContent = withCommas(currentUser.balance)
            this.notifier.showMessage(`Successfully withdrawn $${amount} from your account!`, 'success')
        }

        static send = (toAccount, amount) => {
            const to = users.find(user => user.accountNumber === toAccount)
            const newFromBalance = currentUser.balance - parseInt(amount)

            if (newFromBalance < 0)
                return this.notifier.showMessage("Not enough money to send the amount", 'error')

            if (!to)
                return this.notifier.showMessage("Receiver doesn't exists", 'error')

            const newTransactionFrom = new TransactSend(
                currentUser.accountNumber, currentUser.balance,
                amount, to.accountNumber, 'TO'
            )
            const newTransactionTo = new TransactSend(
                currentUser.accountNumber, to.balance, amount, to.accountNumber, 'FROM'
            )

            currentUser.balance = newFromBalance;
            currentUser.transactions.unshift(newTransactionFrom)
            to.balance += parseInt(amount);
            to.transactions.unshift(newTransactionTo)
            this.displayBalance.textContent = withCommas(currentUser.balance)
            this.notifier.showMessage(`Successfully sent $${amount} to ${to.accountNumber}`, 'success')
        }

        static getBalance = () => {
            return currentUser.balance;
        }

        static getAccountStatement = () => {
            const user = currentUser.fullname.toLowerCase().replace(/ /, "");
            const stringified = JSON.stringify(currentUser)
            const encodedString = encodeURIComponent(stringified)
            const inMemoryATag = document.createElement('A');
            inMemoryATag.setAttribute('href', `data:text/plain;charset=utf-8,${encodedString}`);
            inMemoryATag.setAttribute('download', `inbank_statement_${user}.json`);
            inMemoryATag.click();
        }

        static submitRegisterForm = event => {
            try {
                event.preventDefault();
                const formData = new FormData(this.form_register);
                const inputs = parseFormData(formData);
                const { reg_fullname, reg_password, reg_password_confirm } = inputs;

                const isUserExisting = users.findIndex(({ fullname }) => fullname === reg_fullname)

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
            currentUser
                ? this.notifier.showMessage(`Welcome back! ${currentUser.fullname}`, 'success')
                : null
            resetForms()
        }

        static submitDepositForm = event => {
            event.preventDefault();
            const formData = new FormData(this.form_deposit);
            const { deposit_amount } = parseFormData(formData);

            if (!deposit_amount)
                return this.notifier.showMessage('Please enter an amount', 'error')

            this.deposit(parseInt(deposit_amount))
            resetForms()
        }

        static submitWithdrawForm = event => {
            event.preventDefault();
            const formData = new FormData(this.form_withdraw);
            const { withdraw_amount } = parseFormData(formData);

            if (!withdraw_amount)
                return this.notifier.showMessage('Please enter an amount', 'error')

            this.withdraw(parseInt(withdraw_amount))
            resetForms()
        }

        static submitSendForm = event => {
            event.preventDefault();
            const formData = new FormData(form_send);
            const { receiver_accnum, send_amount } = parseFormData(formData);

            if (!send_amount)
                return this.notifier.showMessage('Please enter an amount', 'error')

            if (!receiver_accnum)
                return this.notifier.showMessage('Please enter a recepient', 'error')

            if (currentUser.accountNumber == receiver_accnum)
                return this.notifier.showMessage("You can't send money to your self", 'error')

            this.send(receiver_accnum, parseInt(send_amount))
            resetForms()
        }

        static changeAvatar = event => {
            const [image] = event.target.files
            const regEx = new RegExp(/image\/(png|jpg|jpeg)/, 'g')
            const isImage = regEx.test(image.type)

            if (!isImage)
                return this.notifier.showMessage('We only accept images', 'error')

            const blob = URL.createObjectURL(image)
            currentUser.avatar = blob;
            this.displayAvatar.setAttribute('src', blob);
            this.notifier.showMessage(`Successfully changed your avatar`, 'success')
            resetForms()
        }

        static changePassword = event => {
            event.preventDefault();
            const formData = new FormData(this.form_changepassword);
            const fields = parseFormData(formData);
            const { password_current, password_new, password_newconfirm } = fields;

            const decryptedPassword = CryptoJS.AES
                .decrypt(currentUser.password, secret)
                .toString(CryptoJS.enc.Utf8)

            if (password_current !== decryptedPassword)
                return this.notifier.showMessage(`Incorrect current password`, 'error')

            if (password_new !== password_newconfirm)
                return this.notifier.showMessage(`New password doesn't match`, 'error')

            this.notifier.showMessage(`Successfully changed your password. You've been logout. Please login using your new password`, 'success')
            currentUser.password = CryptoJS.AES.encrypt(password_new, secret).toString()
            currentUser = null
            this.showInitialPage(true)
            this.resetLoggedInPage()
            this.showAccountEditModal()
            resetForms()
        }

        static changeTransactionType = event => {
            const transactions = new Array();
            const { value } = event.target

            value === 'ALL'
                ? transactions.push(...currentUser.transactions)
                : transactions.push(...currentUser.transactions.filter(t => t.type === value))

            this.transactionsList.innerHTML = ''; // removes all child nodes

            // display only the last 5 transaction depending on the query
            // hence first 5 instances of a type, unless 'ALL'
            const first5Transaction = transactions.splice(0, 5)

            if (first5Transaction.length === 0) {
                const { div } = new HTMLElementTransactionEmpty()
                this.transactionsList.appendChild(div)
                return null;
            }

            first5Transaction.forEach(transaction => {
                const { li } = new HTMLElementTransaction(transaction)
                this.transactionsList.appendChild(li)
            })
        }
    }
}

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
    this.toAccountNumber = toAccountNumber
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
        ? transaction.type == 'SENT FROM'
            ? `${transaction.type} ${transaction.accountNumber}`
            : `${transaction.type} ${transaction.toAccountNumber}`
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
    this.div.appendChild(this.img)
    this.div.appendChild(this.msg)
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