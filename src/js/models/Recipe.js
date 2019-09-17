import axios from 'axios';
import { baseURL, key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {

        try {
            const res = await axios(`${baseURL}get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url ;
            this.ingredients = res.data.recipe.ingredients;
            console.log(this.ingredients)
        }
        catch (error) {
            alert(error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
        console.log(this.time);
    }

    calcServings() {
        this.servings = 4;
        console.log(this.servings)
    }

    parseIngredients() {
        const newIngredients = this.ingredients.map(el => {

            const units = new Map();
            units.set('tablespoons', 'tbsp');
            units.set('tablespoon', 'tbsp');
            units.set('ounces', 'oz');
            units.set('ounce', 'oz');
            units.set('teaspoons', 'tsp');
            units.set('teaspoon', 'tsp');
            units.set('cups', 'cup');
            units.set('pounds', 'pound');
            units.set('g', 'g');
            units.set('kg', 'kg');


            //1) Uniform units

            let ingredient = el.toLowerCase();
            units.forEach((sol, er) => {
                ingredient = ingredient.replace(er, sol)
            })


            //2) Remove prantheses
            ingredient = ingredient.replace(/\s*\(.*?\)\s*/g, ' ');

            //3) Parse ingredients into count, unit and ingredient
            const unitsArr = [];
            const ingredientArr = ingredient.split(' ');

            units.forEach((val, key) => unitsArr.push(val));
            const unitIndex = ingredientArr.findIndex(el => unitsArr.includes(el));

            let objIng;
            if (unitIndex > -1) {
                const arrCount = ingredientArr.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-','+'));
                }
                // else { count = eval(arrCount.join('+')) }

                objIng = {
                    count,
                    unit: ingredientArr[unitIndex],
                    ingredient: ingredientArr.slice(unitIndex+1).join(' ')
                }

            } else if (parseInt(ingredientArr[0])) {
                objIng = {
                    count: parseInt(ingredientArr[0]),
                    unit: '',
                    ingredient: ingredientArr.slice(1).join(' '),

                }

            } else if (unitIndex === -1) {
                // There is no unit
                objIng = {
                    count: '',
                    unit: '',
                    ingredient
                }

            }


            return objIng;
        })
        this.ingredients = newIngredients;
    }
}

