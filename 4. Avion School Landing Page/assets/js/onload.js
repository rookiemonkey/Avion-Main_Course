window.addEventListener('load', function () {

    /**
     * check if the user already submitted an enrollment application
     * if true, remove the initial message, the form, and the loader
     * from the document and just display the thank you message
     */

    const hasSubmittedEnrollmentDetails = localStorage.getItem('submitted_enrollment');

    if (hasSubmittedEnrollmentDetails) {
        document.getElementById('initial_element').remove();
        document.getElementById('regForm').remove();
        document.getElementsByClassName('loader')[0].remove();
        document.getElementsByClassName('submitted_enrollment')[0].classList.remove('hide')
    }


})