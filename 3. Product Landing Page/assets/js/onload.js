(function handleLoad() {

    const hasSubmittedAlready = localStorage.getItem('submitted');

    // if the user has already submitted a feedback before, unless
    // they clear the cache of their browsers...
    if (hasSubmittedAlready) {
        // remove the form from the DOM
        document.querySelector('#form').remove()

        // selects the needed DOM element and reveal it
        document
            .querySelector('section.submitted')
            .classList.remove('hide');
    }

    return null;
})()