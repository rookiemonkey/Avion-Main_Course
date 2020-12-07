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