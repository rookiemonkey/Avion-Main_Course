async function handleSubmit(event) {
    try {
        // prevents the page from reloading
        event.preventDefault();

        // validate the input, returns bool
        const areValid = validator.validate();

        if (!areValid) {
            // just halt the function execution, no need of error message
            return null;
        }

        // selects the needed DOM elements
        const loader = document.querySelector('section.loader');
        const message = document.querySelector('section.submitted');
        const form = document.querySelector('#form');

        // extract the form data
        const formdata = new FormData(form);

        // hide the form
        form.classList.add('hide');

        // initialize an emtpy object
        let data = {};

        // form an object using the array
        [...formdata].forEach(formitem => {
            data[formitem[0]] = formitem[1]
        });

        // remove the hide class for loader to show it
        loader.classList.remove('hide');

        // proceed with the HTTP request
        const emailserver = 'https://krrb-prod-emailserver-p-3.herokuapp.com/email';

        const raw = await fetch(emailserver, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        // check the response status code
        if (raw.status !== 200) {
            throw new Error('Something went wrong upon with the email server. Please try again later')
        }

        // if 200, remove the hide class to reveal the thank you message
        // and hide the loader again
        loader.classList.add('hide');
        message.classList.remove('hide');

        // set to the user's browser that they already submitted a feedback
        // unless they clear the cache of their browser
        localStorage.setItem('submitted', 'true');
    }

    catch (error) {
        const loader = document.querySelector('section.loader');
        const errormessage = document.querySelector('section.error');

        // hide the loader again
        loader.classList.add('hide');

        // show the error
        errormessage.classList.remove('hide');
    }
}