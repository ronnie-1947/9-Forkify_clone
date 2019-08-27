import axios from 'axios';


export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const baseURL = 'http://cors-anywhere.herokuapp.com/https://api.edamam.com';
        const apiAppID = '1462084f'
        const apiKey = '103660d699c75d6dac71e137464aa339';
        

        try {
            const results = await axios(`${baseURL}/search?q=${this.query}&from=0&to=50&app_id=${apiAppID}&app_key=${apiKey}`);
            this.result = (results.data.hits);
            
        }
        catch (error){
            alert(error);
        }
    }
}

