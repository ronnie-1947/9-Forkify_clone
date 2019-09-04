import {elements} from './base';

export const getInput = ()=> elements.searchInput.value;
export const clearInput = ()=> {elements.searchInput.value = ''};
export const clearResults= ()=> {elements.searchResList.innerHTML = '';
                                elements.searchResPages.innerHTML= '';};

const limitRecipeTitle = (title , limit=17)=>{
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur)=> {
            if(acc + cur.length <= limit){
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0);
        return (`${newTitle.join(' ')}...`);
    }
    else{ return title};
}

const renderRecipe = recipe =>{
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe.url}">
            <figure class="results__fig">
                <img src="${recipe.recipe.image}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
                <p class="results__author">${recipe.recipe.source}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type)=> `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page-1: page+1}>
    <span>Page ${type ==='prev'? page -1:page +1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type=== 'prev'? 'left': 'right'}"></use>
    </svg>
</button>
`;

const renderButtons = (page , numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button;

    if(page ===1 && pages >1){
        // Button to next page;
        button = createButton(page , 'next')
    }
    else if(page < pages && page !==1){
        //Button to next page and prev page
        button = `${createButton(page , 'prev')}
                  ${createButton(page , 'next')}
        `
    }
    else if(page === pages && pages >1){
        // Button to previous page
        button = createButton(page , 'prev')
    }

    elements.searchResPages.insertAdjacentHTML('beforeend' , button);
};

export const renderResults = (recepies , page=1, resPerPage =10)=>{
    // Render results of current page
    const start = resPerPage*(page-1);
    const end = page*resPerPage ;
    recepies.slice(start , end).forEach(el=> renderRecipe(el));
    
    // Render results of button 
    renderButtons(page , recepies.length, resPerPage)

}