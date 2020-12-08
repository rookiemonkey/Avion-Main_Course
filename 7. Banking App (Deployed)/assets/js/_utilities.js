// ====================================================== //
// UTILITY FUNCTIONS 
// ====================================================== //
function parseFormData(formData) {
    const formdataParsed = {};

    [...formData].forEach(formitem => {
        formdataParsed[formitem[0]] = formitem[1]
    });

    return formdataParsed;
}

function resetInitViewToHome() {
    const initNavItemsArr = [...document.querySelector('.nav-options').children];
    const initNavViewsArr = [...document.querySelector('.view_initial_nav_dynamic').children];

    initNavViewsArr.forEach(view => {
        view.dataset.view === 'home'
            ? view.style.display = 'flex'
            : view.style.display = 'none'
    })

    initNavItemsArr.forEach(navItem => {
        navItem.dataset.view === 'home'
            ? navItem.classList.add('active-nav')
            : navItem.classList.remove('active-nav')
    })
}

function resetLoggedInPage() {
    const userActionsParent = document.querySelector('.user_actions');
    const userActionsViewsParent = document.querySelector('.view_useractions_parent');
    const userActionsViewsArr = [...userActionsViewsParent.children];
    const userActionsBtnsArr = [...userActionsParent.children];

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

function resetForms() {
    BankingApp.form_register.reset();
    BankingApp.form_login.reset();
    BankingApp.form_deposit.reset();
    BankingApp.form_withdraw.reset();
    BankingApp.form_send.reset();
    BankingApp.form_changepassword.reset();
    BankingApp.changeAvatarBtn.value = '';
    BankingApp.transactionSelect.value = 'All';
    BankingApp.transactionsList.innerHTML = '';
}

function withCommas(num) {
    return num
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}