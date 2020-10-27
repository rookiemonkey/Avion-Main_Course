window.addEventListener('scroll', function () {
    // get the y-axis scroll value
    const scroll_value = window.scrollY;

    // select the header/navigation
    const header_navigation = document.querySelector('header#header');

    if (scroll_value > 0) {
        header_navigation.classList.add('scrolled')
    }
    else {
        header_navigation.classList.remove('scrolled')
    }
});