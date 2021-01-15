
export default class FormInput {

    constructor(suggestions) {
        this.suggestions = suggestions;
        this.parent = document.createElement('div')
        this.limit = 10
    }

    init() {
        const suggestionList = document.querySelector('.autocomplete');
        const input = document.querySelector('.search__field');
        this.parent.classList.add('autocomplete-items');

        // mount to dom below input
        suggestionList.appendChild(this.parent)

        // mount oninput listener
        input.oninput = () => {

            // empty the dom
            this.parent.innerHTML = ``;

            for (let s = 0; s <= this.suggestions.length - 1; s++) {
                const term = this.suggestions[s];

                const phraseFromTerm = term.substr(0, input.value.length).toUpperCase();

                if (phraseFromTerm != input.value.toUpperCase()) continue;

                const div = document.createElement('div');

                div.innerHTML = `
                    <strong>${term.substr(0, input.value.length)}</strong>${term.substr(input.value.length)}
                `

                this.parent.appendChild(div);

                if (this.parent.children.length == this.limit) break;
            }
        }


        // mount blur listener (when user clicked outside input)
        input.onblur = () => this.parent.innerHTML = ``
    }

}