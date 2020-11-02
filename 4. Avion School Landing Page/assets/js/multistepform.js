/**
 * since document.getElements returns an array and its zero-based indexing,
 * we initialized a variable currentTab as 0 instead of 1 as global variable
 */
let currentTab = 0;

/**
 * attach an event listener to start button to reveal the form
 */
document.getElementById('startRegForm').addEventListener('click', start);


/**
 * 
 * used in validateForm function
 * @onAir : option, true to listen on onChange events
 */
const validator = new Validator(
    document.querySelector('#regForm'),
    function (err, res) {
        return res
    }, {
    autoTracking: true,
    onAir: true
});




/**
 * allows a certain part of the form to reveal depending on the tab number
 */
function showTab(n) {

    // get all the elements with classname 'tab'
    const tabs = document.getElementsByClassName("tab");

    // display the tab number pass to this function
    tabs[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (tabs.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }

    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}





/**
 * display the next tab(tabNumber) and hide the current tab
 *  where n = -1 if previous
 *        n = 1 if next
 */
function nextPrev(n) {

    // get all the elements with classname 'tab'
    const tabs = document.getElementsByClassName("tab");

    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;

    // Hide the current tab:
    tabs[currentTab].style.display = "none";

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form... :
    if (currentTab >= tabs.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }

    // Otherwise, display the correct tab:
    showTab(currentTab);
}





/**
 * validate the input of the currenttab before going to the next step
 * this is invoked inside nextPrev function above
 */
function validateForm() {
    // This function deals with validation of the form fields
    let tabs, inputs, areValid = true;

    // get the current tab being displayed
    tabs = document.getElementsByClassName("tab");

    // we only have type text, radio, and checkboxes for inputs
    // get the inputs elements on the current tab being displayed
    inputs = tabs[currentTab].getElementsByTagName("input");

    // A loop that checks every input (text, radio) field in the current tab:
    [...inputs].forEach(input => areValid = validator.validate(input))

    // If valid, mark the step as finished and valid:
    if (areValid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }

    // if not, show the Error for each field, fixes the issue when clicked next, no error
    if (!areValid && inputs[0].type !== 'radio') {
        [...inputs].forEach(input => validator.showErrors(input))
    }

    return areValid; // return the valid status
}





/**
 * fixes the multistep form indicator below the form
 */
function fixStepIndicator(n) {

    // This function removes the "active" class of all steps...
    const step = document.getElementsByClassName("step");

    for (let i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(" active", "");
    }

    //... and adds the "active" class to the current step:
    step[n].className += " active";
}





/**
 * reveals the form
 */
function start() {

    // reveal the form
    document
        .querySelector('#regForm')
        .classList.remove('hide');


    // hide the initial page
    document
        .querySelector('#initial_element')
        .classList.toggle('hide');

    /**
    * invoke the showTab function and pass in the currentTab varialbe.
    * this allows the currentTab number to be displayed to the user
    */
    showTab(currentTab);
}







/**
 * go back to home and resets everything
 */
function goto_home() {

    // this should reset the whole form values
    document.getElementById('regForm').reset();

    // hide all the tabs
    [...document.getElementsByClassName("tab")].forEach((tab) => {
        tab.style.display = 'none';
    });

    // hide the form
    document.querySelector('#regForm').classList.add('hide');

    // reset the progress indicators
    [...document.getElementsByClassName("step")].forEach((step) => {
        step.classList.remove('finish');
    });

    // reset the currentTab to 0 again
    currentTab = 0;

    // resets the classes back to when homepage is being displayed, refer to functions.js
    goto_enroll(); // its the other way  around
}