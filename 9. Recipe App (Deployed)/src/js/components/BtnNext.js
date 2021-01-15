import UIController from '../ui';
import icons from '../../images/icons.svg';

export default class BtnNext {

    render(numPage, numResults) {

        // render only if first page or page inbetween
        if (
            numPage == 1 ||
            numPage >= 2 && numPage < numResults ||
            numPage !== numResults
        ) {

            const parent = document.querySelector('.results__pages');
            const button = document.createElement('button');
            button.className = `btn-inline results__btn--next`;

            button.innerHTML = `
                <span>Page ${numPage + 1}</span >
                <svg class="search__icon">
                    <use href="${icons}#icon-triangle-right"></use>
                </svg>
            `

            parent.appendChild(button);

            button.onclick = () => UIController.renderResults('next');
        }
    }

}