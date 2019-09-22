export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList : document.querySelector('.likes__list')
};

const classes = {
    loader: '.loader'
}

export const renderloader = parent => {
    const loaderHtml = `
        <div class = "loader">
            <svg>
                <use href ="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loaderHtml);
}

export const clearloader = () => {
    const loader = document.querySelector(classes.loader);
    loader.parentNode.removeChild(loader);
}