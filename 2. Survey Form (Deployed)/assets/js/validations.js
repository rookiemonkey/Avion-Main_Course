const form = document.querySelector('form#survey-form');

const settings = {
    autoTracking: true,
    onAir: true
};

const callback = function (err, res) {
    return res
}

// to be used by onsubmit.js
const validator = new Validator(form, callback, settings);