import UIController from './ui';

const DataController = new class DataController {

    constructor() {
        this.base_url = 'https://forkify-api.herokuapp.com/api/v2';
    }

    async queryInput(event) {
        try {
            const input = document.querySelector('.search__field');

            if (!input.value) return null;

            UIController.resultPage = 1;
            document.querySelector('.results__list').innerHTML = ``;
            document.querySelector('.results__pages').innerHTML = ``;
            UIController.loader('.results__list', true);

            event.preventDefault();
            const raw = await fetch(`${this.base_url}/recipes?search=${input.value}`);
            const res = await raw.json();

            if (raw.status !== 200)
                throw new Error('Something went wrong upon communicating to API')

            if (!res.results)
                throw new Error(`No Results found against your query. </br> Please check the available queries <a href="https://forkify-api.herokuapp.com/phrases.html" target="_blank">here</a>`)

            const { recipes } = res.data;

            // parse the response and create multi-dim array for pagination
            let paginatedRecipes = new Object();
            let groupedRecipes = new Array();
            let groupPage = 1;

            recipes.forEach((recipe, index) => {
                const isLastItemOfPage = (index + 1) % 10 == 0;
                const isLastIteration = index == recipes.length - 1

                if (isLastItemOfPage || isLastIteration) {
                    groupedRecipes.push(recipe);
                    paginatedRecipes[groupPage] = groupedRecipes;
                    groupedRecipes = new Array();
                    groupPage++
                }

                if (!isLastItemOfPage && !isLastIteration)
                    groupedRecipes.push(recipe);

            })

            UIController.loader('.results__list', false);
            UIController.renderResults(false, paginatedRecipes);
        }

        catch (error) {
            UIController.loader('.results__list', false);

            document.querySelector('.results__list').innerHTML = `
                <p class="error_results">${error.message}</p>
            `
        }
    }

    async queryRecipe(query) {
        try {
            document.querySelector('.recipe').innerHTML = ``;
            UIController.loader('.recipe', true);

            const raw = await fetch(`${this.base_url}/recipes/${query}`);
            const res = await raw.json();

            if (raw.status !== 200) throw new Error(res.error)

            UIController.loader('.recipe', false);
            UIController.renderRecipe(res);
        }

        catch (error) {
            UIController.loader('.recipe', false);
            console.log(error);
        }
    }

}

export default DataController;