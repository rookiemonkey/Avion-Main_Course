import App from '../main';
import icons from '../../images/icons.svg';

export default class ShoppingListItem {

    constructor(ingredient) {
        this.ingredient = ingredient
        this.parent = document.querySelector('.shopping__list');
    }

    render() {
        const li = document.createElement('li');
        li.id = `ing_${this.ingredient.id}`
        li.classList.add('shopping__item');

        li.innerHTML = `
            <div class="shopping__count">
                <input 
                    type="number" 
                    min="0"
                    value="${this.ingredient.quantity}" 
                    step="${this.ingredient.step}"
                    data-id="${this.ingredient.id}"
                >
                <p>${this.ingredient.unit}</p>
            </div>
            <p class="shopping__description">${this.ingredient.description}</p>
            <button class="shopping__delete btn-tiny" id="btn_${this.ingredient.id}">
                <svg>
                    <use href="${icons}#icon-circle-with-cross"></use>
                </svg>
            </button>
        `

        // moun to dom
        this.parent.appendChild(li);


        // mount onclick delete listener
        const btn_delete = document.querySelector(`#btn_${this.ingredient.id}`);

        btn_delete.onclick = () => {
            document.querySelector(`#ing_${this.ingredient.id}`).remove();
            App.shoppingList = App.shoppingList.filter(ing => {
                return ing.id != this.ingredient.id
            })

            App.storage('update');
        }


        // mount onchange listener
        const quantity_input = document.querySelector(`[data-id='${this.ingredient.id}']`);

        quantity_input.onchange = e => {

            const { valueAsNumber, dataset } = e.target;

            App.shoppingList = App.shoppingList.map(item => {
                if (item.id != dataset.id) return item

                item.quantity = valueAsNumber;
                return item;
            })

            App.storage('update');
        };
    }

}