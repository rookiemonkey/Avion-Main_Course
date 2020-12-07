// ====================================================== //
// CLASS: w/o instantiation since all props/methods are static
// ====================================================== //
const BankingApp = Application();



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

            if (key === 'Enter') {
                event.returnValue = true
                return true
            }

            if (!numInput && numInput !== 0)
                throw new Error('Please enter numbers')
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

// onsubmission of change password
BankingApp.form_changepassword.addEventListener('submit', BankingApp.changePassword)

// onchange of file to change the avatar
BankingApp.changeAvatarBtn.addEventListener('change', BankingApp.changeAvatar)

// click for downloading the bank statement
BankingApp.getBankStatementBtn.addEventListener('click', BankingApp.getAccountStatement)

// onchange of transaction type select options
BankingApp.transactionSelect.addEventListener('change', BankingApp.changeTransactionType)

// toggling the account edit modal
BankingApp.accountEditModalBtn.addEventListener('click', BankingApp.showAccountEditModal)

BankingApp.accountEditModalBtnClose.addEventListener('click', BankingApp.showAccountEditModal)