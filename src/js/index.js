import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderloader, clearloader } from './views/base';


/*-------------------
Search Controller
----------------- */

// global state of the app
const state = {};

const controlSearch = async () => {
    //1 get query from view
    const query = searchView.getInput() //To do


    if (query) {
        //2. New search object and add to state
        state.search = new Search(query);

        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderloader(elements.searchRes);

        try {
            //4. Search for recepies
            await state.search.getResults();

            //5. Render results on UI
            clearloader();
            searchView.renderResults(state.search.result)
        }
        catch (err) { alert(err) }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);

        // Render results on UI
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
    }
});


/*-------------------
Recipe Controller
----------------- */

const controlRecipe = async () => {
    // Get Id from url
    const id = window.location.hash.replace('#', '');

    //
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderloader(elements.recipe);

        // Creating new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get Recipe Data and parseIngredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
        

            // Calculate servings  and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render Recipe
            clearloader();
            recipeView.renderRecipe(state.recipe);
        }
        catch (err) { alert(error) }
    }
};

const events = ['hashchange', 'load'];
events.forEach((event) => window.addEventListener(event, controlRecipe));

// console.log(state)