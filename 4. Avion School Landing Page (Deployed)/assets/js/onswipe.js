/**
 * SOURCES:
 *      - touch events: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
 *      - touch values: https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
 */


/**
 * allows users to swipe from
 *      - right to left, to open the sidebar
 *      - left to right, to close the sidebar
 * 
 * NOTE: 
 *      - the event listener is added onload of the DOM, check onload.js
 *      - hamburger is only shown at 960px and below
 */


/**
 * HELPER FUNCTION: get the x,y coordinate of the start touch event
 */

function getTouchStartValues(event) {
    const x_coor = event.touches[0].clientX;
    const y_coor = event.touches[0].clientY;
    touch_start = [x_coor, y_coor];
}


/**
 * HELPER FUNCTION: get the x,y coordinate of the end touch event
 *      also, decides of the threshold of the swipe is enough to open the sidebar
 */

function getTouchEndValues(event) {
    const threshold = 100; // at least 100px < (to open) or > (to close)
    const x_coor = event.changedTouches[0].clientX;
    const y_coor = event.changedTouches[0].clientY;
    touch_end = [x_coor, y_coor];

    // select needed elements
    const sidebar = document.querySelector('#sidebar');
    const main = document.querySelector('main#content')

    // check if its a swipe from left-to-right or right-to-left
    if (touch_start[0] > touch_end[0]) {
        // !right-to-left since start is higher

        // swipe x-axis travelled distance = touch_start_x - touch_end_x;
        let travelled_distance = touch_start[0] - touch_end[0];

        if (travelled_distance >= threshold) {
            const isSidebarOpen = sidebar.classList.contains("sidebar_open");
            const isMainShifted = main.classList.contains("sidebar_open_forcontent")

            if (!isSidebarOpen && !isMainShifted) {
                sidebar.classList.toggle('sidebar_open')
                main.classList.toggle('sidebar_open_forcontent')
            }
        }

    } else {
        // !left-to-right since start is higher

        // swipe x-axis travelled distance = touch_start_x - touch_end_x; other way around
        let travelled_distance = touch_end[0] - touch_start[0];

        if (travelled_distance >= threshold) {

            const isSidebarOpen = sidebar.classList.contains("sidebar_open");
            const isMainShifted = main.classList.contains("sidebar_open_forcontent")

            if (isSidebarOpen && isMainShifted) {
                sidebar.classList.toggle('sidebar_open')
                main.classList.toggle('sidebar_open_forcontent')
            }
        }
    }

}