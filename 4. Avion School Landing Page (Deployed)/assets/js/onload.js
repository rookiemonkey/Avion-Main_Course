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
        document.getElementsByClassName('loader-enrollment')[0].remove();
        document.getElementsByClassName('submitted_enrollment')[0].classList.remove('hide')
    }


    /**
     * check if the user already submitted a contact request
     * if true, remove unnecessary elements and display the 
     * success message instead.
     */
    const hasSubmittedContactRequest = localStorage.getItem('submitted_contact');

    if (hasSubmittedContactRequest) {
        document.getElementById('contact-form').remove();
        document.querySelector('.loader-contact').remove();
        document.querySelector('.submitted_contact_error').remove();
        document.querySelector('.submitted_contact').classList.remove('hide');
    }


    /**
    * for preloaded css stylesheet. This can be done inline of the link tag
    */
    const preloaded = document.getElementById('preloaded_stylesheet');
    preloaded.setAttribute('rel', 'stylesheet');


})