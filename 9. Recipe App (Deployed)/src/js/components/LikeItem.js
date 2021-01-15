import DataController from '../data';

export default class LikeItem {

    constructor(data) {
        this.recipe = data;
        this.parent = document.querySelector('.likes__list');
    }

    render() {

        const DOMStrings = `
            <a class="likes__link" 
                href="#${this.recipe.id}"
                data-rid_like="${this.recipe.id}"
            >
                <figure class="likes__fig">
                    <img src="${this.recipe.image_url}" alt="${this.recipe.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${this.recipe.title}</h4>
                    <p class="likes__author">${this.recipe.publisher}</p>
                </div>
            </a>

        `

        // mount to dom
        this.parent.insertAdjacentHTML('beforeend', DOMStrings)


        // mount event listener
        const like_item_selector = `[data-rid_like="${this.recipe.id}"]`;
        const likeItem = document.querySelector(like_item_selector)
        likeItem.onclick = () => DataController.queryRecipe(this.recipe.id);
    }

}