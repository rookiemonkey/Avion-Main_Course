const enroll_buttons = document.querySelectorAll('.enroll_button');
const goback = document.querySelector('#goback');

// use 'for of' loop since enroll is an array of DOM elements
for (const button of enroll_buttons) {
    button.addEventListener('click', goto_enroll); // refer to functions.js
}

// button to navigate back to the home page from the enrollment form
// toggles back the classes and resets the whole form
goback.addEventListener('click', goto_home) // refer to multistepform.js, 