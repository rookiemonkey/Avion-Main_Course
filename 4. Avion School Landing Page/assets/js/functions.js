function toggle_menu() {

    document
        .querySelector('#sidebar')
        .classList.toggle('sidebar_open');

    document
        .querySelector('main#content')
        .classList.toggle('sidebar_open_forcontent');

}

function goto_enroll() {
    document
        .querySelector('#banner')
        .classList.toggle('hide');

    document
        .querySelector('#how')
        .classList.toggle('hide');

    document
        .querySelector('#process')
        .classList.toggle('hide');

    document
        .querySelector('#learn')
        .classList.toggle('hide');

    document
        .querySelector('#testimonial-ceo')
        .classList.toggle('hide');

    document
        .querySelector('#testimonial-students')
        .classList.toggle('hide');

    document
        .querySelector('#contact')
        .classList.toggle('hide');

    document
        .querySelector('#sidebar')
        .classList.toggle('hide');

    // incase the enroll button from sidebar was clicked
    if (document.querySelector('#sidebar').classList.contains('sidebar_open')) {
        document.querySelector('#sidebar').classList.toggle('sidebar_open');
    }

    // incase the enroll button from sidebar was clicked
    if (document.querySelector('main#content').classList.contains('sidebar_open_forcontent')) {
        document.querySelector('main#content').classList.toggle('sidebar_open_forcontent');
    }

    document
        .querySelector('footer')
        .classList.toggle('hide');

    document
        .querySelector('#enroll')
        .classList.toggle('hide');

    // incase the user went back to home, then go back to the enrollment form
    if (document.querySelector('div#initial_element').classList.contains('hide')) {
        document.querySelector('div#initial_element').classList.toggle('hide')
    }
}