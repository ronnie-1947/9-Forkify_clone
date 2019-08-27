import Search from './models/Search';

// global state of the app
const state = {};

const controlSearch = async()=>{
    //1 get query from view
    const query = 'pizza' //To do

    if (query){
        //2. New search object and add to state
        state.search = new Search(query);
        console.log(state)

        //3. prepare UI for results

        //4. Search for recepies
        await state.search.getResults();

        //5. Render results on UI
        console.log(state)
        // console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e=> {
    e.preventDefault();
})
controlSearch();


