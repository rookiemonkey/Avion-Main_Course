function handleSubmit(event) {
    // prevents the page from reloading
    event.preventDefault();

    // validate the input, returns bool
    const areValid = validator.validate();

    if (!areValid) {
        // halt the function execution
        return null;
    }

    // selects the needed DOM elements
    const loader = document.querySelector('section.loader');
    const message = document.querySelector('section.submitted');

    // remove the form from the DOM
    document.querySelector('#form').remove();

    // remove the hide class for loader
    loader.classList.remove('hide');

    // remove the hide class to reveal the thank you message after 2s delay
    // and hide the loader again
    setTimeout(() => {
        loader.classList.add('hide');
        message.classList.remove('hide');
    }, 2000)

    // set to the user's browser that they already submitted a feedback
    // unless they clear the cache of their browser
    localStorage.setItem('submitted', 'true');

}