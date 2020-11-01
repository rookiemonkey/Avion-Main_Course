function toggle_menu() {

    document
        .querySelector('#sidebar')
        .classList.toggle('sidebar_open');

    document
        .querySelector('main#content')
        .classList.toggle('sidebar_open_forcontent');

}