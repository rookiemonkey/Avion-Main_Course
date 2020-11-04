
/**
 * requestAnimationFrame is a method that we can use to repeatedly check our page to see if elements are visible, while making sure we don’t overload the browser by checking thousands of times per second. It does this by limiting how often the callback is executed to either the screen’s refresh rate or 60 times per second.  This way we are able to have a fallback function for browsers that don’t yet support it.
 */
const scroll = window.requestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };

/**
 * select all elements that needs to shown on scroll. this will be the class
 * of those elements needed to be animated on scroll
 */
const elementsToShow = document.querySelectorAll('.show-on-scroll');



/**
 * UTILITY FUNCTION: checks if the element is w/in the browsers
 * view port, return boolean
 * SOURCE: http://stackoverflow.com/a/7557433/274826
 */
function isElementInViewport(element) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && element instanceof jQuery) {
        element = element[0];
    }

    // getBoundingClientRect is the box containing the element
    const rect = element.getBoundingClientRect();

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}


/**
 * MAIN FUNCTION: toggles 'is-visible' if the element is w/in
 * the browsers viewport
 */
function showOnScroll() {
    elementsToShow.forEach(function (element) {

        // check if the element is inside the view port, by using the defined function
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');

            // check if the its the last enroll button
            if (element.dataset.type && element.dataset.type === 'last_enroll_button') {
                element.classList.add('pulse');
            }
        }

        else {
            element.classList.remove('is-visible');

            // check if the its the last enroll button
            if (element.dataset.type && element.dataset.type === 'last_enroll_button') {
                element.classList.remove('pulse');
            }
        }
    })

    // revursive, everytime something happens with the requestAnimationFrame
    scroll(showOnScroll);
}


// initial invocation of the main onscroll function
showOnScroll();




/**
 * NOTE: once this js file is setup, (even w/o the class styles), you should be
 * seeing classnames that is being toggled when that element is shown on the browser
 */