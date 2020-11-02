(function (q) {
    var r = "validate formatString destroy reload getFormHandle getFields showErrors hideErrors".split(" "), m = function (a, b, c) {
        a.JsValidator = this; this.settings = { onAir: !0, showErrors: !0, autoHideErrors: !1, autoHideErrorsTimeout: 2E3, locale: "en", messages: {}, rules: {}, errorClassName: "error", removeSpaces: !1, autoTracking: !0, eventsList: ["keyup", "change", "blur"] }; var d = this; this.formHandle = a || null; this.submitCallback = b || null; this.fields = this.getFields(this.formHandle.querySelectorAll("[data-rule]")); this.applySettings(c ||
            {}); this.submitCallback = this.submitCallback.bind(this); this._eventChangeWithDelay = this._eventChangeWithDelay.bind(this); this._eventChange = this._eventChange.bind(this); this._eventSubmit = this._eventSubmit.bind(this); this.submitCallback && this.eventsBuilder("addEventListener"); this.settings.autoTracking && "MutationObserver" in window && (new MutationObserver(function (a) {
                [].forEach.call(a, function (a) {
                    switch (a.type) {
                        case "subtree": case "childList": var b = !1, c = [];[].forEach.call(a.addedNodes, function (a) {
                            c = a.querySelectorAll ?
                                a.querySelectorAll("*") : []; -1 !== ["SELECT", "INPUT", "TEXTAREA", "CHECKBOX", "RADIOBUTTON"].indexOf(a.tagName) && (b = !0); !b && [].forEach.call(c, function (a) { -1 !== ["SELECT", "INPUT", "TEXTAREA", "CHECKBOX", "RADIOBUTTON"].indexOf(a.tagName) && (b = !0) })
                        }); b && d.reload()
                    }
                })
            })).observe(this.formHandle, { childList: !0, subtree: !0 }); return this
    }; m.prototype = {
        messages: {
            en: {
                required: { empty: "This field is required", incorrect: "Incorrect value" }, notzero: { empty: "Please make a selection", incorrect: "Incorrect value" }, integer: {
                    empty: "Enter an integer value",
                    incorrect: "Incorrect integer value"
                }, "float": { empty: "Enter an float number", incorrect: "Incorrect float" }, min: { empty: "Enter more", incorrect: "Enter more" }, max: { empty: "Enter less", incorrect: "Enter less" }, between: { empty: "Enter the between {0}-{1}", incorrect: "Enter the between {0}-{1}" }, name: { empty: "Please, enter your name", incorrect: "Incorrect format. Name should only include letters and some special characters like '-'" }, lastname: { empty: "Please, enter your lastname", incorrect: "Incorrect format. Last Name should only include letters and some special characters like '-'" }, phone: { empty: "Please, enter the phone number", incorrect: "Incorrect phone number" },
                email: { empty: "Please, enter your email address", incorrect: "Incorrect email format" }, length: { empty: "Please, Enter a minimum of {0} characters and a maximum of {1}", incorrect: "Incorrect. Enter a minimum of {0} characters and a maximum of {1}" }, minlength: { empty: "Please, enter at least {0} characters", incorrect: "You have entered less than {0} characters" }, maxlength: { empty: "Please, enter at maximum {0} characters", incorrect: "You have entered more than {0} characters" }, maxfilesize: {
                    empty: "The size of one or more selected files larger than {0} {1}",
                    incorrect: "The size of one or more selected files larger than {0} {1}"
                }, fileextension: { empty: "Select file", incorrect: "One or more files have an invalid type" }
            }
        }, rules: {
            required: function (a) { return "" !== a }, notzero: function (a) { return 0 < parseInt(a, 10) }, integer: function (a) { return (new RegExp(/^[0-9]+$/gi)).test(a) }, "float": function (a) { a = a.toString().replace(/,/, "."); return this.integer(a) || (new RegExp(/^([0-9])+(\.)([0-9]+$)/gi)).test(a) }, min: function (a, b) {
                return this["float"](a) ? parseFloat(a) >= parseFloat(b[0]) :
                    parseInt(a, 10) >= parseInt(b[0], 10)
            }, max: function (a, b) { return this["float"](a) ? parseFloat(a) <= parseFloat(b[0]) : parseInt(a, 10) <= parseInt(b[0], 10) }, between: function (a, b) { b[1] = b[1] || 999999; return this["float"](a) ? parseFloat(a) >= parseFloat(b[0]) && parseFloat(a) <= parseFloat(b[1]) : this.integer(a) ? parseInt(a, 10) >= parseInt(b[0], 10) && parseInt(a, 10) <= parseInt(b[1], 10) : !1 }, name: function (a) { return 0 < a.length && 2 > a.length ? !1 : (new RegExp(/^[a-zA-Z\s\u0430-\u044f\u0410-\u042f\u0451\u0401\-]+$/g)).test(a) }, lastname: function (a) { return this.name(a) },
            phone: function (a) { return a.replace(/[^0-9]+/gi, "").match(/[0-9]+/gi) && 6 > a.replace(/[^0-9]+/gi, "").match(/[0-9]+/gi)[0].length ? !1 : (new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\. \\\/]?)?((?:\(?\d{1,}\)?[\-\. \\\/]?){0,})(?:[\-\. \\\/]?(?:#|ext\.?|extension|x)[\-\. \\\/]?(\d+))?$/g)).test(a) }, email: function (a) { return (new RegExp(/^(("[\w-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)).test(a) },
            length: function (a, b) { return this.between(a.replace(/\s{2,}/g, " ").length, b) }, maxlength: function (a, b) { return this.max(a.replace(/\s{2,}/g, " ").length, b) }, minlength: function (a, b) { return this.min(a.replace(/\s{2,}/g, " ").length, b) }, maxfilesize: function (a, b) { var c, d = a.length, e = 1; switch (b[1].toLowerCase()) { case "b": e = 1; break; case "kb": e = 1024; break; case "mb": e = 1048576; break; case "gb": e = 1073741824; break; case "tb": e = 1099511627776 }for (c = 0; c < d; c += 1)if (parseFloat(a[c]) > parseFloat(b[0]) * e) return !1; return !0 },
            fileextension: function (a, b) { var c, d, e = b.length, g = a.length, h = 0; for (c = 0; c < e; c += 1)for (d = 0; d < g; d += 1)b[c] === a[d].split(".").pop() && (h += 1); return a.length === h ? !0 : !1 }
        }, orderFields: function (a, b) { var c = this, d = {}; a && b && Object.keys(this.fields).forEach(function (e) { c.fields[e].handle[a] && c.fields[e].handle[a] === b && (d[e] = c.fields[e]) }); return d }, _eventSubmit: function (a) {
            a.preventDefault(); this.hideErrors(!1, !0); !this.validate() && this.showErrors(); !0 === this.submitCallback(this.errors || null, this.errors ? !1 : !0) &&
                this.formHandle.submit()
        }, _eventChange: function (a) { var b = this; this.settings.removeSpaces && (new RegExp(/\s{2,}/g)).test(a.target.value) && (a.target.value = a.target.value.replace(/\s{2,}/g, " ")); if ("radio" === a.target.type) { var c = this.orderFields("name", a.target.name); Object.keys(c).forEach(function (a) { b.hideErrors(c[a].handle) }) } else this.hideErrors(a.target); this.validate(a.target) || (this.showErrors(a.target), !this.settings.showErrors && this.submitCallback(this.errors, !1)) }, _eventChangeWithDelay: function (a) {
            var b =
                this; this.intervalID && clearTimeout(this.intervalID); this.intervalID = setTimeout(function () { b._eventChange.apply(b, [a]) }, 400)
        }, applySettings: function (a) {
            var b = this; a.rules && Object.keys(a.rules).forEach(function (c) { b.rules[c] = a.rules[c] }); a.messages && Object.keys(a.messages).forEach(function (c) {
                Object.keys(a.messages[c]).forEach(function (d) {
                    Object.keys(a.messages[c][d]).forEach(function (e) {
                        b.settings.messages[c] = b.settings.messages[c] || {}; b.settings.messages[c][d] = b.settings.messages[c][d] || {}; b.settings.messages[c][d][e] =
                            a.messages[c][d][e]
                    })
                })
            }); Object.keys(a).forEach(function (c) { b.settings[c] = a[c] }); return this
        }, getFields: function (a) {
            var b = {}, c = [], d = []; a = a || this.formHandle.querySelectorAll("[data-rule]"); Object.keys(a).forEach(function (e) { c = a[e].getAttribute("data-rule").split("|"); Object.keys(c).forEach(function (a) { c[a].match(/-/gi) ? (d = c[a].split("-"), c[a] = d[0], d = d.splice(1), c[a] = [c[a], d]) : c[a] = [c[a], []] }); b[e] = { name: a[e].getAttribute("name"), rules: c, defaultValue: a[e].getAttribute("data-default"), handle: a[e], intervalID: null } });
            return b
        }, validate: function (a) {
            var b = this, c = a ? this.getFields([a]) : this.fields, d, e, g, h, f, k, l = null; this.errors = this.errors ? null : this.errors; Object.keys(c).forEach(function (a) {
                d = !0; c[a].rules && Object.keys(c[a].rules).forEach(function (m) {
                    e = c[a].rules[m][0]; g = c[a].rules[m][1]; h = c[a].defaultValue; f = c[a].handle.value; switch (c[a].handle.type) {
                        case "checkbox": !c[a].handle.checked && (f = ""); break; case "radio": var n = b.orderFields("name", c[a].handle.name), p = !1; Object.keys(n).forEach(function (a) {
                            n[a].handle.checked &&
                                (p = !0)
                        }); p || (Object.keys(n).forEach(function (a) { try { k = b.settings.messages[b.settings.locale][e].empty } catch (u) { k = b.messages[b.settings.locale][e].empty } }), f = ""); break; case "file": c[a].handle.files && c[a].handle.files.length && (f = [], Object.keys(c[a].handle.files).forEach(function (b) { switch (e) { case "maxfilesize": f.push(c[a].handle.files[b].size); break; case "fileextension": f.push(c[a].handle.files[b].name) } }))
                    }if (d && ("" !== f || c[a].rules.join("|").match(/\|{0,1}required\|{0,1}/))) if (d && h && f !== h ? (d = !1, l =
                        "incorrect") : d && b.rules[e] && !b.rules[e](f, g) && ("" === f ? (d = !1, l = "empty") : (d = !1, l = "incorrect")), d) b.hideErrors(c[a].handle, !0); else { b.errors = b.errors || {}; try { try { k = b.settings.messages[b.settings.locale][e][l] } catch (t) { k = b.messages[b.settings.locale][e][l] } } catch (t) { e = "required", k = b.messages.en[e][l] } !g.length && g.push(f); b.errors[a] = { name: c[a].name, errorText: b.formatString(k, g) }; b.submitCallback || (b.errors[a].handle = c[a].handle) }
                })
            }); return this.submitCallback ? this.errors ? !1 : !0 : this.errors || !0
        }, hideErrors: function (a,
            b) { var c = this, d; Object.keys(this.fields).forEach(function (e) { if (a && a === c.fields[e].handle || !a) d = c.fields[e].handle.nextElementSibling, b && c.fields[e].handle.classList.remove(c.settings.errorClassName), d && "validator-error" === d.getAttribute("data-type") && d.parentNode.removeChild(d) }) }, showErrors: function (a) {
                var b = this, c, d = function (a, d) {
                    a.classList.add(b.settings.errorClassName); a.nextElementSibling && "validator-error" === a.nextElementSibling.getAttribute("data-type") || !b.settings.showErrors || (c = document.createElement("div"),
                        c.setAttribute("class", b.settings.errorClassName), c.setAttribute("data-type", "validator-error"), c.innerHTML = d.errorText, a.parentNode.insertBefore(c, a.nextSibling))
                }; Object.keys(this.errors).forEach(function (c) { a ? Object.keys(b.fields).forEach(function (e) { b.fields[e].handle.getAttribute("name") === a.getAttribute("name") && d(b.fields[e].handle, b.errors[c]) }) : ("0" === c || 0 < c && b.fields[c].name !== b.fields[c - 1].name) && d(b.fields[c].handle, b.errors[c]) }); this.settings.autoHideErrors && (a ? (a.intervalID && clearTimeout(a.intervalID),
                    this.intervalID || (a.intervalID = setTimeout(function () { a.intervalID = null; b.hideErrors(a) }, this.settings.autoHideErrorsTimeout))) : (this.intervalID && clearTimeout(this.intervalID), this.intervalID = setTimeout(function () { b.intervalID = null; b.hideErrors(!1) }, this.settings.autoHideErrorsTimeout)))
            }, getFormHandle: function () { return this.formHandle }, formatString: function (a, b) { return a.replace(/\{(\d+)\}/gi, function (a, d) { return a && b[d] ? b[d] : "" }) }, destroy: function () { this.hideErrors(!1, !0); this.eventsBuilder("removeEventListener") },
        reload: function (a, b) { this.destroy(); switch (arguments.length) { case 2: this.submitCallback = a; this.settings = b; break; case 1: this.settings = a }this.fields = this.getFields(this.formHandle.querySelectorAll("[data-rule]")); this.submitCallback && this.eventsBuilder("addEventListener"); this.applySettings(b || {}) }, eventsBuilder: function (a) {
            var b = this; this.formHandle[a]("submit", this._eventSubmit); this.settings.onAir && Object.keys(this.fields).forEach(function (c) {
                [].forEach.call(b.settings.eventsList, function (d) {
                    if ("keyup" ===
                        d) b.fields[c].handle[a](d, b._eventChangeWithDelay); else b.fields[c].handle[a](d, b._eventChange)
                })
            })
        }
    }; q.Validator = function () { var a = function (a, b) { function c() { return a.apply(this, b) } c.prototype = a.prototype; return new c }(m, arguments), b = function () { }; b.prototype = {};[].forEach.call(r, function (c) { b.prototype[c] = function () { return a[c].apply(a, arguments) } }); return new b(arguments) }
})(this);