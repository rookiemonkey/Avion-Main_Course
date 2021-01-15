import App from '../main';
import UIController from '../ui';
import RecipeIngredientItem from './RecipeIngredientItem';
import icons from '../../images/icons.svg';

export default class Recipe {

    constructor(data) {
        this.recipe = data
        this.parent = document.querySelector('.recipe');
        this.servings = data.servings;
    }

    render() {

        // check if this recipe is already been liked
        const isLiked = App.likes
            .some(({ id }) => id == this.recipe.id)

        // mount to dom
        this.parent.innerHTML = `
            <figure class="recipe__fig">
                <img src="${this.recipe.image_url}" alt="${this.recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${this.recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${this.recipe.cooking_time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people" id="servings_amount">
                        ${this.servings}
                    </span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny" id="servings_sub">
                            <svg>
                                <use href="${icons}#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny" id="servings_add">
                            <svg>
                                <use href="${icons}#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love" data-action="like_${this.recipe.id}">
                    <svg class="header__likes" data-svg="heart_${this.recipe.id}">

            ${isLiked
                ? `<use href="${icons}#icon-heart"></use>`
                : `<use href="${icons}#icon-heart-outlined"></use>`
            }

                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                </ul>

                <button class="btn-small recipe__btn" id="add_to_shopping_list">
                    <svg class="search__icon">
                        <use href="${icons}#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${this.recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${this.recipe.source_url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-triangle-right"></use>
                    </svg>
                </a>
            </div>
        `

        // parse/mount the ingredients
        this.recipe.ingredients.forEach(ing => {
            ing.id = Math.random().toString().substr(2, 13)
            new RecipeIngredientItem(ing).render();
        })


        // mount like event
        const like_button_selector = `[data-action="like_${this.recipe.id}"]`;
        const heart_icon_selector = `[data-svg="heart_${this.recipe.id}"]`;
        const like_button = document.querySelector(like_button_selector);
        const heart_icon = document.querySelector(heart_icon_selector);

        like_button.onclick = event => {
            event.stopPropagation();

            const isLiked2 = App.likes
                .some(({ id }) => id == this.recipe.id)

            if (isLiked2) {
                heart_icon.innerHTML = `<use href="${icons}#icon-heart-outlined"></use>`;
                App.likes = App.likes.filter(({ id }) => {
                    id != this.recipe.id
                })
            }

            if (!isLiked2) {
                heart_icon.innerHTML = `<use href="${icons}#icon-heart"></use>`;
                App.likes.push(this.recipe);
            }

            App.storage('update');
            document.getElementById('badge').textContent = App.likes.length;
            UIController.renderLikes();
        };


        // mount add to shopping list event
        const add_btn = document.querySelector('#add_to_shopping_list');

        add_btn.onclick = () => {
            // add a step property
            const parsed = this.recipe.ingredients.map(ing => {
                ing.step = ing.quantity;
                return ing
            })

            App.shoppingList = new Array();
            App.shoppingList.push(...parsed);
            App.storage('update');
            UIController.renderShoppingList();
        }


        // mount add/sub servings event
        const add_btn_servings = document.querySelector('#servings_add');
        const sub_btn_servings = document.querySelector('#servings_sub');
        add_btn_servings.onclick = () => this.updateServings('add');
        sub_btn_servings.onclick = () => this.updateServings('sub');
    };

    updateServings(action) {
        if (action == 'sub' && this.servings == 1) return

        const newServings = action === 'sub'
            ? this.servings - 1
            : this.servings + 1;

        this.recipe.ingredients.forEach(ing => {
            ing.quantity *= (newServings / this.servings)
        });

        this.servings = newServings;
        document.querySelector('#servings_amount').textContent = this.servings;
        document.querySelector('.recipe__ingredient-list').innerHTML = ``;
        this.recipe.ingredients.forEach(ing => new RecipeIngredientItem(ing).render())
    };
}   