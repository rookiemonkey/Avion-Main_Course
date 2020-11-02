function toggle_menu() {

    document
        .querySelector('#sidebar')
        .classList.toggle('sidebar_open');

    document
        .querySelector('main#content')
        .classList.toggle('sidebar_open_forcontent');

}

function goto_enroll() {
    // select necessary elements
    const main = document.querySelector('main#content');
    const banner = document.querySelector('#banner');
    const how = document.querySelector('#how');
    const process = document.querySelector('#process');
    const learn = document.querySelector('#learn');
    const ceo = document.querySelector('#testimonial-ceo');
    const students = document.querySelector('#testimonial-students');
    const contact = document.querySelector('#contact');
    const footer = document.querySelector('footer');
    const sidebar = document.querySelector('#sidebar');
    const enroll = document.querySelector('#enroll');
    const enroll_init = document.querySelector('div#initial_element');

    // hide elements when enrollment form is accessed.
    banner.classList.toggle('hide');
    how.classList.toggle('hide');
    process.classList.toggle('hide');
    learn.classList.toggle('hide');
    ceo.classList.toggle('hide');
    students.classList.toggle('hide');
    contact.classList.toggle('hide');
    footer.classList.toggle('hide');
    sidebar.classList.toggle('hide');
    enroll.classList.toggle('hide'); // from not hidden to hidden

    // incase the enroll button from sidebar was clicked
    if (sidebar.classList.contains('sidebar_open')) {
        sidebar.classList.toggle('sidebar_open');
    }

    // incase the enroll button from sidebar was clicked
    if (main.classList.contains('sidebar_open_forcontent')) {
        main.classList.toggle('sidebar_open_forcontent');
    }

    // incase the user went back to home, then go back to the enrollment form
    if (enroll_init && enroll_init.classList.contains('hide')) {
        enroll_init.classList.toggle('hide')
    }
}