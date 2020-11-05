document
    .querySelector('#hamburger')
    .addEventListener('click', toggle_menu); // refer to functions.js

document
    .querySelector('#close_sidebar_btn')
    .addEventListener('click', toggle_menu); // refer to functions.js


/**
 * attach an onclick listeners to every sidebar links so that
 * every time a sidebar link is clicked, side bar will automatically close
 * except for 'enroll now' button
 */

const sidebar_links = document.querySelectorAll('.sidebar-link');

sidebar_links.forEach(function (link) {
    link.addEventListener('click', toggle_menu);
});