import DataController from './data';
import UIController from './ui';
import FormInput from './components/FormInput';

const App = new class Application {

    constructor() {
        this.likes = new Array();
        this.shoppingList = new Array();
    }

    async onload() {

        // fetch the available queries HTML and parse it
        const raw = await fetch('https://forkify-api.herokuapp.com/phrases.html');
        const res = await raw.text();
        const domParser = new DOMParser()
        const documentPhrases = domParser.parseFromString(res, 'text/html')
        const list = documentPhrases.querySelectorAll('li');
        const suggestions = new Array();

        for (const el of list) suggestions.push(el.textContent)


        // initialize form event
        const form = document.querySelector('.search');
        form.onsubmit = e => DataController.queryInput(e)

        // initialize input suggestions
        new FormInput(suggestions).init();

        // initialize state and render
        const { likes, shoppinglist } = App.storage('read');
        App.likes = likes;
        App.shoppingList = shoppinglist;
        UIController.renderLikes();
        UIController.renderShoppingList();
        document.getElementById('badge').textContent = App.likes.length
    }

    storage(action) {

        switch (true) {

            case action == 'update':
                localStorage.setItem('likes', JSON.stringify(this.likes))
                localStorage.setItem('shoppinglist', JSON.stringify(this.shoppingList))
                break;

            case action == 'read':
                const likes = JSON.parse(localStorage.getItem('likes'));
                const shoppinglist = JSON.parse(localStorage.getItem('shoppinglist'));
                return {
                    likes: likes == null ? [] : likes,
                    shoppinglist: shoppinglist == null ? [] : shoppinglist
                }

        }

    }
}

window.onload = App.onload

export default App;