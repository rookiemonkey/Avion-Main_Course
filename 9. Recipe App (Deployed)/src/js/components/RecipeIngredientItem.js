import icons from '../../images/icons.svg';
import toFraction from '../utilities/toFraction';

export default class RecipeIngredientItem {

    constructor(ingredient) {
        this.ingredient = ingredient
        this.parent = document.querySelector('.recipe__ingredient-list');
    }

    render() {
        const li = document.createElement('li');
        li.classList.add("recipe__item");

        li.innerHTML = `
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__count">${toFraction(this.ingredient.quantity)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${this.ingredient.unit}</span>
                ${this.ingredient.description}
            </div>
        `

        this.parent.appendChild(li);
    }

}