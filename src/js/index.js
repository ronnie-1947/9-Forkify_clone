import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderloader, clearloader } from './views/base';

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
        
        
        //4. Search for recepies
        await state.search.getResults();
        
        //5. Render results on UI
        
        console.log(state.search.result);
        clearloader();
        searchView.renderResults(state.search.result)
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
} );

