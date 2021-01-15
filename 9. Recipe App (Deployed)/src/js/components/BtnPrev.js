import UIController from '../ui';
import icons from '../../images/icons.svg';

export default class BtnPrev {

    render(numPage, numResults) {

        // render only if last page or page inbetween
        if (
            numPage == numResults ||
            numPage >= 2 && numPage < numResults
        ) {

            const parent = document.querySelector('.results__pages');
            const button = document.createElement('button');
            button.className = `btn-inline results__btn--prev`;

            button.innerHTML = `
                <svg class="search__icon">
                    <use href="${icons}#icon-triangle-left"></use>
                </svg>
                <span>Page ${numPage - 1}</span>
            `

            parent.appendChild(button);

            button.onclick = () => UIController.renderResults('prev');
        }
    }

}