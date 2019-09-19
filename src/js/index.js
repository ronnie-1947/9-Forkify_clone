import Search from './models/Search';
import Recipe from './models/Recipe';
import list from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
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

        // Highlight selected search item
        if(state.search){
            searchView.highlightSelected(id);
        }

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

/*-------------------
List Controller
----------------- */

const controlList = ()=> {
    // create a new List if there is no list
    if(!state.list){
        state.list = new list();
        
    }

    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.additem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle the delete button
    if (e.target.matches('.shopping__delete , .shopping__delete *')){
        // Delete from state
        state.list.deleteitem(id);

        // Delete from UI
        listView.deleteItem(id);
    }
        // Handle the count update
    else if (e.target.matches('.shopping__count-value , .shopping__count-value *')){
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
        console.log(state.list.items)
    }

})


// Handling Recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if(state.recipe.servings >1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsInredients(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServingsInredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
})



 