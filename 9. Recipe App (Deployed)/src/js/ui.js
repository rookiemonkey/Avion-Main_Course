import App from './main';
import Recipe from './components/Recipe';
import ResultItem from './components/ResultItem';
import LikeItem from './components/LikeItem';
import ShoppingListItem from './components/ShoppingListItem';
import BtnPrev from './components/BtnPrev';
import BtnNext from './components/BtnNext';
import ico_loader from '../images/loader.svg';

const UIController = new class UIController {

    constructor() {
        this.resultPage = 1;
        this.results = new Object();
    }

    loader(parent, toshow) {
        const container = document.querySelector(parent);
        const loader = document.createElement(`div`);
        loader.classList.add('loader_container')

        if (!toshow) return container.innerHTML = '';

        loader.innerHTML = `<img src="${ico_loader}" class="loader" />`
        container.appendChild(loader);
    }

    renderResults(toPage, data = this.results) {
        const parent = document.querySelector('.results__list');
        const parent_btn = document.querySelector('.results__pages');

        const rerender = () => {
            data[this.resultPage]
                .forEach(recipe => new ResultItem(recipe).render())
        }

        // render the items
        switch (true) {
            case !toPage:
                this.results = Object.assign(data);
                rerender();
                break;

            case toPage == 'next':
                if (this.resultPage < Object.keys(this.results).length) {
                    this.resultPage++;
                    parent.innerHTML = ``;
                    parent_btn.innerHTML = ``;
                    rerender();
                }
                break;

            case toPage == 'prev':
                if (this.resultPage >= 2) {
                    this.resultPage--;
                    parent.innerHTML = ``;
                    parent_btn.innerHTML = ``;
                    rerender();
                }
                break;
        }

        // for results with only one page
        if (Object.keys(this.results).length == 1) return null

        // render pagination buttons
        new BtnPrev().render(this.resultPage, Object.keys(this.results).length);
        new BtnNext().render(this.resultPage, Object.keys(this.results).length);
    }

    renderRecipe(data) {
        const { recipe } = data.data;

        [...document.querySelector('.results__list').children].forEach(item => {

            item.id == `recipe_${recipe.id}`
                ? item.classList.add('results__link--active')
                : item.classList.remove('results__link--active')
        })

        new Recipe(recipe).render();
    }

    renderLikes() {
        const parent = document.querySelector('.likes__list');
        parent.innerHTML = ``;

        if (!App.likes.length)
            return parent.innerHTML = `
                <p class="likes__list_nolikes">You have no liked receipes yet.</p>
            `

        App.likes.forEach(likedRecipe => new LikeItem(likedRecipe).render())
    }

    renderShoppingList() {
        const parent = document.querySelector('.shopping__list');
        parent.innerHTML = ``;

        App.shoppingList.forEach(ing => new ShoppingListItem(ing).render())

        if (App.shoppingList.length) {
            parent.insertAdjacentHTML('afterbegin', `
                <button id="clear_shoppinglist">
                    Clear
                </button>
            `)

            const btn_clear = document.querySelector('#clear_shoppinglist');
            btn_clear.onclick = () => {
                parent.innerHTML = ``;
                App.shoppingList = new Array();
                App.storage('update');
            }
        }
    }
}

export default UIController;