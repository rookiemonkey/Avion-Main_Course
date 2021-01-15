import DataController from '../data';
import loader from '../../images/loader.svg';

export default class Result {

    constructor(data) {
        this.result = data
        this.parent = document.querySelector('.results__list');
    }

    render() {
        const li = document.createElement('li');
        li.id = `recipe_${this.result.id}`

        li.innerHTML = `
            <a class="results__link" href="#${this.result.id}">
                <figure class="results__fig">
                    <img 
                        src="${loader}" 
                        id="img_loader${this.result.id}"
                    />
                    <img 
                        src="${this.result.image_url}" 
                        alt="${this.result.title}" 
                        id="img_recipe${this.result.id}" 
                        style="display: none;"
                    >
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${this.result.title}</h4>
                    <p class="results__author">${this.result.publisher}</p>
                </div>
            </a>
        `

        // mount to dom
        this.parent.appendChild(li);

        // mount event listener
        li.onclick = () => DataController.queryRecipe(this.result.id);

        // mount onload listener for images
        const img_loader = document.querySelector(`#img_loader${this.result.id}`);
        const img_recipe = document.querySelector(`#img_recipe${this.result.id}`);

        img_recipe.onload = () => {
            img_recipe.style.display = 'block';
            img_loader.remove();
        }
    }
}