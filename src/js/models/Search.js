import axios from 'axios';
import {baseURL, key} from '../config';


export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(){
        
        try {
            const results = await axios(`${baseURL}search?key=${key}&q=${this.query}`);
            this.result = (results.data.recipes);
            
        }
        catch (error){
            alert(error);
        }
    }
}

