!function(e){var t="validate formatString destroy reload getFormHandle getFields showErrors hideErrors".split(" "),r=function(e,t,r){e.JsValidator=this,this.settings={onAir:!0,showErrors:!0,autoHideErrors:!1,autoHideErrorsTimeout:2e3,locale:"en",messages:{},rules:{},errorClassName:"error",removeSpaces:!1,autoTracking:!0,eventsList:["keyup","change","blur"]};var s=this;return this.formHandle=e||null,this.submitCallback=t||null,this.fields=this.getFields(this.formHandle.querySelectorAll("[data-rule]")),this.applySettings(r||{}),this.submitCallback=this.submitCallback.bind(this),this._eventChangeWithDelay=this._eventChangeWithDelay.bind(this),this._eventChange=this._eventChange.bind(this),this._eventSubmit=this._eventSubmit.bind(this),this.submitCallback&&this.eventsBuilder("addEventListener"),this.settings.autoTracking&&"MutationObserver"in window&&new MutationObserver((function(e){[].forEach.call(e,(function(e){switch(e.type){case"subtree":case"childList":var t=!1,r=[];[].forEach.call(e.addedNodes,(function(e){r=e.querySelectorAll?e.querySelectorAll("*"):[],-1!==["SELECT","INPUT","TEXTAREA","CHECKBOX","RADIOBUTTON"].indexOf(e.tagName)&&(t=!0),!t&&[].forEach.call(r,(function(e){-1!==["SELECT","INPUT","TEXTAREA","CHECKBOX","RADIOBUTTON"].indexOf(e.tagName)&&(t=!0)}))})),t&&s.reload()}}))})).observe(this.formHandle,{childList:!0,subtree:!0}),this};r.prototype={messages:{en:{required:{empty:"This field is required",incorrect:"Incorrect value"},notzero:{empty:"Please make a selection",incorrect:"Incorrect value"},integer:{empty:"Enter an integer value",incorrect:"Incorrect integer value"},float:{empty:"Enter an float number",incorrect:"Incorrect float"},min:{empty:"Enter more",incorrect:"Enter more"},max:{empty:"Enter less",incorrect:"Enter less"},between:{empty:"Enter the between {0}-{1}",incorrect:"Enter the between {0}-{1}"},name:{empty:"Please, enter your name",incorrect:"Incorrect name format."},lastname:{empty:"Please, enter your lastname",incorrect:"Incorrect format. Last Name should only include letters and some special characters like '-'"},phone:{empty:"Please, enter the phone number",incorrect:"Incorrect phone number"},email:{empty:"Please, enter your email address",incorrect:"Incorrect email format"},length:{empty:"Please, Enter a minimum of {0} characters and a maximum of {1}",incorrect:"Incorrect. Enter a minimum of {0} characters and a maximum of {1}"},minlength:{empty:"Please, enter at least {0} characters",incorrect:"You have entered less than {0} characters"},maxlength:{empty:"Please, enter at maximum {0} characters",incorrect:"You have entered more than {0} characters"},maxfilesize:{empty:"The size of one or more selected files larger than {0} {1}",incorrect:"The size of one or more selected files larger than {0} {1}"},fileextension:{empty:"Select file",incorrect:"One or more files have an invalid type"}}},rules:{required:function(e){return""!==e},notzero:function(e){return 0<parseInt(e,10)},integer:function(e){return new RegExp(/^[0-9]+$/gi).test(e)},float:function(e){return e=e.toString().replace(/,/,"."),this.integer(e)||new RegExp(/^([0-9])+(\.)([0-9]+$)/gi).test(e)},min:function(e,t){return this.float(e)?parseFloat(e)>=parseFloat(t[0]):parseInt(e,10)>=parseInt(t[0],10)},max:function(e,t){return this.float(e)?parseFloat(e)<=parseFloat(t[0]):parseInt(e,10)<=parseInt(t[0],10)},between:function(e,t){return t[1]=t[1]||999999,this.float(e)?parseFloat(e)>=parseFloat(t[0])&&parseFloat(e)<=parseFloat(t[1]):!!this.integer(e)&&(parseInt(e,10)>=parseInt(t[0],10)&&parseInt(e,10)<=parseInt(t[1],10))},name:function(e){return!(0<e.length&&2>e.length)&&new RegExp(/^[a-zA-Z\s\u0430-\u044f\u0410-\u042f\u0451\u0401\-]+$/g).test(e)},lastname:function(e){return this.name(e)},phone:function(e){return!(e.replace(/[^0-9]+/gi,"").match(/[0-9]+/gi)&&6>e.replace(/[^0-9]+/gi,"").match(/[0-9]+/gi)[0].length)&&new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\. \\\/]?)?((?:\(?\d{1,}\)?[\-\. \\\/]?){0,})(?:[\-\. \\\/]?(?:#|ext\.?|extension|x)[\-\. \\\/]?(\d+))?$/g).test(e)},email:function(e){return new RegExp(/^(("[\w-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(e)},length:function(e,t){return this.between(e.replace(/\s{2,}/g," ").length,t)},maxlength:function(e,t){return this.max(e.replace(/\s{2,}/g," ").length,t)},minlength:function(e,t){return this.min(e.replace(/\s{2,}/g," ").length,t)},maxfilesize:function(e,t){var r,s=e.length,n=1;switch(t[1].toLowerCase()){case"b":n=1;break;case"kb":n=1024;break;case"mb":n=1048576;break;case"gb":n=1073741824;break;case"tb":n=1099511627776}for(r=0;r<s;r+=1)if(parseFloat(e[r])>parseFloat(t[0])*n)return!1;return!0},fileextension:function(e,t){var r,s,n=t.length,i=e.length,a=0;for(r=0;r<n;r+=1)for(s=0;s<i;s+=1)t[r]===e[s].split(".").pop()&&(a+=1);return e.length===a}},orderFields:function(e,t){var r=this,s={};return e&&t&&Object.keys(this.fields).forEach((function(n){r.fields[n].handle[e]&&r.fields[n].handle[e]===t&&(s[n]=r.fields[n])})),s},_eventSubmit:function(e){e.preventDefault(),this.hideErrors(!1,!0),!this.validate()&&this.showErrors(),!0===this.submitCallback(this.errors||null,!this.errors)&&this.formHandle.submit()},_eventChange:function(e){var t=this;if(this.settings.removeSpaces&&new RegExp(/\s{2,}/g).test(e.target.value)&&(e.target.value=e.target.value.replace(/\s{2,}/g," ")),"radio"===e.target.type){var r=this.orderFields("name",e.target.name);Object.keys(r).forEach((function(e){t.hideErrors(r[e].handle)}))}else this.hideErrors(e.target);this.validate(e.target)||(this.showErrors(e.target),!this.settings.showErrors&&this.submitCallback(this.errors,!1))},_eventChangeWithDelay:function(e){var t=this;this.intervalID&&clearTimeout(this.intervalID),this.intervalID=setTimeout((function(){t._eventChange.apply(t,[e])}),400)},applySettings:function(e){var t=this;return e.rules&&Object.keys(e.rules).forEach((function(r){t.rules[r]=e.rules[r]})),e.messages&&Object.keys(e.messages).forEach((function(r){Object.keys(e.messages[r]).forEach((function(s){Object.keys(e.messages[r][s]).forEach((function(n){t.settings.messages[r]=t.settings.messages[r]||{},t.settings.messages[r][s]=t.settings.messages[r][s]||{},t.settings.messages[r][s][n]=e.messages[r][s][n]}))}))})),Object.keys(e).forEach((function(r){t.settings[r]=e[r]})),this},getFields:function(e){var t={},r=[],s=[];return e=e||this.formHandle.querySelectorAll("[data-rule]"),Object.keys(e).forEach((function(n){r=e[n].getAttribute("data-rule").split("|"),Object.keys(r).forEach((function(e){r[e].match(/-/gi)?(s=r[e].split("-"),r[e]=s[0],s=s.splice(1),r[e]=[r[e],s]):r[e]=[r[e],[]]})),t[n]={name:e[n].getAttribute("name"),rules:r,defaultValue:e[n].getAttribute("data-default"),handle:e[n],intervalID:null}})),t},validate:function(e){var t,r,s,n,i,a,l=this,o=e?this.getFields([e]):this.fields,c=null;return this.errors=this.errors?null:this.errors,Object.keys(o).forEach((function(e){t=!0,o[e].rules&&Object.keys(o[e].rules).forEach((function(h){switch(r=o[e].rules[h][0],s=o[e].rules[h][1],n=o[e].defaultValue,i=o[e].handle.value,o[e].handle.type){case"checkbox":!o[e].handle.checked&&(i="");break;case"radio":var u=l.orderFields("name",o[e].handle.name),f=!1;Object.keys(u).forEach((function(e){u[e].handle.checked&&(f=!0)})),f||(Object.keys(u).forEach((function(e){try{a=l.settings.messages[l.settings.locale][r].empty}catch(e){a=l.messages[l.settings.locale][r].empty}})),i="");break;case"file":o[e].handle.files&&o[e].handle.files.length&&(i=[],Object.keys(o[e].handle.files).forEach((function(t){switch(r){case"maxfilesize":i.push(o[e].handle.files[t].size);break;case"fileextension":i.push(o[e].handle.files[t].name)}})))}if(t&&(""!==i||o[e].rules.join("|").match(/\|{0,1}required\|{0,1}/)))if(t&&n&&i!==n?(t=!1,c="incorrect"):t&&l.rules[r]&&!l.rules[r](i,s)&&(""===i?(t=!1,c="empty"):(t=!1,c="incorrect")),t)l.hideErrors(o[e].handle,!0);else{l.errors=l.errors||{};try{try{a=l.settings.messages[l.settings.locale][r][c]}catch(e){a=l.messages[l.settings.locale][r][c]}}catch(e){r="required",a=l.messages.en[r][c]}!s.length&&s.push(i),l.errors[e]={name:o[e].name,errorText:l.formatString(a,s)},l.submitCallback||(l.errors[e].handle=o[e].handle)}}))})),this.submitCallback?!this.errors:this.errors||!0},hideErrors:function(e,t){var r,s=this;Object.keys(this.fields).forEach((function(n){(e&&e===s.fields[n].handle||!e)&&(r=s.fields[n].handle.nextElementSibling,t&&s.fields[n].handle.classList.remove(s.settings.errorClassName),r&&"validator-error"===r.getAttribute("data-type")&&r.parentNode.removeChild(r))}))},showErrors:function(e){var t,r=this,s=function(e,s){e.classList.add(r.settings.errorClassName),e.nextElementSibling&&"validator-error"===e.nextElementSibling.getAttribute("data-type")||!r.settings.showErrors||((t=document.createElement("div")).setAttribute("class",r.settings.errorClassName),t.setAttribute("data-type","validator-error"),t.innerHTML=s.errorText,e.parentNode.insertBefore(t,e.nextSibling))};Object.keys(this.errors).forEach((function(t){e?Object.keys(r.fields).forEach((function(n){r.fields[n].handle.getAttribute("name")===e.getAttribute("name")&&s(r.fields[n].handle,r.errors[t])})):("0"===t||0<t&&r.fields[t].name!==r.fields[t-1].name)&&s(r.fields[t].handle,r.errors[t])})),this.settings.autoHideErrors&&(e?(e.intervalID&&clearTimeout(e.intervalID),this.intervalID||(e.intervalID=setTimeout((function(){e.intervalID=null,r.hideErrors(e)}),this.settings.autoHideErrorsTimeout))):(this.intervalID&&clearTimeout(this.intervalID),this.intervalID=setTimeout((function(){r.intervalID=null,r.hideErrors(!1)}),this.settings.autoHideErrorsTimeout)))},getFormHandle:function(){return this.formHandle},formatString:function(e,t){return e.replace(/\{(\d+)\}/gi,(function(e,r){return e&&t[r]?t[r]:""}))},destroy:function(){this.hideErrors(!1,!0),this.eventsBuilder("removeEventListener")},reload:function(e,t){switch(this.destroy(),arguments.length){case 2:this.submitCallback=e,this.settings=t;break;case 1:this.settings=e}this.fields=this.getFields(this.formHandle.querySelectorAll("[data-rule]")),this.submitCallback&&this.eventsBuilder("addEventListener"),this.applySettings(t||{})},eventsBuilder:function(e){var t=this;this.formHandle[e]("submit",this._eventSubmit),this.settings.onAir&&Object.keys(this.fields).forEach((function(r){[].forEach.call(t.settings.eventsList,(function(s){"keyup"===s?t.fields[r].handle[e](s,t._eventChangeWithDelay):t.fields[r].handle[e](s,t._eventChange)}))}))}},e.Validator=function(){var e=function(e,t){function r(){return e.apply(this,t)}return r.prototype=e.prototype,new r}(r,arguments),s=function(){};return s.prototype={},[].forEach.call(t,(function(t){s.prototype[t]=function(){return e[t].apply(e,arguments)}})),new s(arguments)}}(this);
const enroll_buttons=document.querySelectorAll(".enroll_button"),goback=document.querySelector("#goback");for(const o of enroll_buttons)o.addEventListener("click",goto_enroll);goback.addEventListener("click",goto_home);
function toggle_menu(){document.querySelector("#sidebar").classList.toggle("sidebar_open"),document.querySelector("main#content").classList.toggle("sidebar_open_forcontent")}function goto_enroll(){const e=document.querySelector("main#content"),t=document.querySelector("#banner"),o=document.querySelector("#how"),s=document.querySelector("#process"),c=document.querySelector("#learn"),l=document.querySelector("#testimonial-ceo"),n=document.querySelector("#testimonial-students"),i=document.querySelector("#contact"),r=document.querySelector("footer"),a=document.querySelector("#sidebar"),d=document.querySelector("#enroll"),g=document.querySelector("div#initial_element");t.classList.toggle("hide"),o.classList.toggle("hide"),s.classList.toggle("hide"),c.classList.toggle("hide"),l.classList.toggle("hide"),n.classList.toggle("hide"),i.classList.toggle("hide"),r.classList.toggle("hide"),a.classList.toggle("hide"),d.classList.toggle("hide"),a.classList.contains("sidebar_open")&&a.classList.toggle("sidebar_open"),e.classList.contains("sidebar_open_forcontent")&&e.classList.toggle("sidebar_open_forcontent"),g&&g.classList.contains("hide")&&g.classList.toggle("hide")}
document.querySelector("#hamburger").addEventListener("click",toggle_menu),document.querySelector("#close_sidebar_btn").addEventListener("click",toggle_menu);const sidebar_links=document.querySelectorAll(".sidebar-link");sidebar_links.forEach((function(e){e.addEventListener("click",toggle_menu)}));
let currentTab=0;document.getElementById("startRegForm").addEventListener("click",start);const validator=new Validator(document.querySelector("#regForm"),(function(e,t){return t}),{autoTracking:!0,onAir:!0});function showTab(e){const t=document.getElementsByClassName("tab");if(currentTab>=t.length)return null;t[e].style.display="block",t[e].classList.add("fadeIn"),document.getElementById("prevBtn").style.display=0==e?"none":"inline",e==t.length-1?document.getElementById("nextBtn").innerHTML="Submit":document.getElementById("nextBtn").innerHTML="Next",fixStepIndicator(e)}function nextPrev(e){const t=document.getElementsByClassName("tab");if(1==e&&!validateForm())return!1;t[currentTab].style.display="none",t[currentTab].classList.add("fadeOut");const n=currentTab;setTimeout((()=>{t[n].classList.remove("fadeOut")}),550),currentTab+=e,currentTab>=t.length&&onsubmit_enroll(),showTab(currentTab)}function onsubmit_enroll(){document.removeEventListener("keypress",handle_enterkey);const e=document.querySelector("#regForm"),t=document.querySelector("#initial_element"),n=document.querySelector(".loader-enrollment"),r=document.querySelector(".submitted_enrollment");n.classList.remove("hide"),e.classList.add("hide");const a=new FormData(e);let s={};[...a].forEach((e=>{s[e[0]]=e[1]})),console.log("data to be POSTED via an API",s),setTimeout((()=>{t.remove(),e.remove(),n.remove(),r.classList.remove("hide"),localStorage.setItem("submitted_enrollment","true")}),2500)}function validateForm(){let e,t,n=!0;return e=document.getElementsByClassName("tab"),t=e[currentTab].getElementsByTagName("input"),[...t].forEach((e=>n=validator.validate(e))),n&&(document.getElementsByClassName("step")[currentTab].className+=" finish"),n||"radio"===t[0].type||[...t].forEach((e=>validator.showErrors(e))),n}function fixStepIndicator(e){const t=document.getElementsByClassName("step");for(let e=0;e<t.length;e++)t[e].className=t[e].className.replace(" active","");t[e].className+=" active"}function handle_enterkey(e){13===e.which&&nextPrev(1)}function start(){document.querySelector("#regForm").classList.remove("hide"),document.querySelector("#initial_element").classList.toggle("hide"),document.addEventListener("keypress",handle_enterkey),showTab(currentTab)}function goto_home(){const e=document.getElementById("regForm"),t=document.getElementsByClassName("tab"),n=document.getElementsByClassName("step");e&&(e.reset(),e.classList.add("hide")),t.length>0&&[...t].forEach((e=>{e.style.display="none",e.classList.remove("fadeIn"),e.classList.remove("fadeOut")})),n.length>0&&[...n].forEach((e=>{e.classList.remove("finish")})),document.removeEventListener("keypress",handle_enterkey),currentTab=0,goto_enroll()}
window.addEventListener("load",(function(){localStorage.getItem("submitted_enrollment")&&(document.getElementById("initial_element").remove(),document.getElementById("regForm").remove(),document.getElementsByClassName("loader-enrollment")[0].remove(),document.getElementsByClassName("submitted_enrollment")[0].classList.remove("hide"));localStorage.getItem("submitted_contact")&&(document.getElementById("contact-form").remove(),document.querySelector(".loader-contact").remove(),document.querySelector(".submitted_contact_error").remove(),document.querySelector(".submitted_contact").classList.remove("hide"));document.getElementById("preloaded_stylesheet").setAttribute("rel","stylesheet")}));
window.addEventListener("scroll",(function(){const e=document.querySelector("#navigation");window.scrollY>window.innerHeight?e.classList.add("scrolled"):e.classList.remove("scrolled")}));const scroll=window.requestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},elementsToShow=document.querySelectorAll(".show-on-scroll");function isElementInViewport(e){"function"==typeof jQuery&&e instanceof jQuery&&(e=e[0]);const t=e.getBoundingClientRect();return t.top<=0&&t.bottom>=0||t.bottom>=(window.innerHeight||document.documentElement.clientHeight)&&t.top<=(window.innerHeight||document.documentElement.clientHeight)||t.top>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)}function showOnScroll(){elementsToShow.forEach((function(e){isElementInViewport(e)?(e.classList.add("is-visible"),e.dataset.type&&"last_enroll_button"===e.dataset.type&&e.classList.add("pulse")):(e.classList.remove("is-visible"),e.dataset.type&&"last_enroll_button"===e.dataset.type&&e.classList.remove("pulse"))})),scroll(showOnScroll)}showOnScroll();
const validator_contact=new Validator(document.getElementById("contact-form"),(function(t,e){return e}),{autoTracking:!0,onAir:!0});async function handleSubmit(t){try{t.preventDefault();if(!validator_contact.validate())return validator_contact.showErrors(),null;const e=document.querySelector("section.loader-contact"),o=document.querySelector("section.submitted_contact"),a=document.querySelector("#contact-form"),c=new FormData(a);a.classList.add("hide");let r={};[...c].forEach((t=>{r[t[0]]=t[1]})),e.classList.remove("hide");const n="https://krrb-prod-emailserver-p-3.herokuapp.com/email";if(200!==(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).status)throw new Error("Something went wrong upon with the email server. Please try again later");e.classList.add("hide"),o.classList.remove("hide"),localStorage.setItem("submitted_contact","true")}catch(t){const e=document.querySelector("section.loader-contact "),o=document.querySelector("section.submitted_contact_error");e.classList.add("hide"),o.classList.remove("hide")}}