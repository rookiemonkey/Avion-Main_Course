"use strict";

const display = document.getElementById('display');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const hello = document.getElementById('hello');
const goodbye = document.getElementById('goodbye');
const names = document.querySelectorAll('.preselected-name-btn');

// onclick of the sayhello button
hello.onclick = function () {
    if (input.value) {
        display.textContent = `Hello, ${input.value}`;
        return responsiveVoice.speak(display.textContent);
    }

    display.textContent = `Hello World`;
    responsiveVoice.speak(display.textContent);
};

// onclick of the saygoodbye button
goodbye.onclick = function () {
    switch (true) {
        case input.value && goodbye.childNodes[1].textContent === 'Say Goodbye':
            display.textContent = `Goodbye ${input.value}`;
            responsiveVoice.speak(display.textContent);
            goodbye.innerHTML = `<i class="ion-refresh"></i>Clear`;
            break;
        case input.value && goodbye.childNodes[1].textContent === 'Clear':
            display.textContent = '';
            goodbye.innerHTML = `<i class="ion-android-exit"></i>Say Goodbye`;
            break;
    }
}

// onclick of the submit button
submit.onclick = function () {
    display.textContent = input.value;
    responsiveVoice.speak(display.textContent);
};

// loop on the preselected names
[...names].forEach(nameBtn => {
    nameBtn.onclick = function () {
        input.value = nameBtn.textContent
    }
});