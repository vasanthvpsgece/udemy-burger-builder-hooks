import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const arrayConverter = (igKey) => { return [...Array(props.ingredients[igKey])]
                                      .map((_, i) => {return <BurgerIngredient key={igKey + i} type={igKey} />})
                                    };
    const reducer = (accumulator, currentValue) => {return accumulator.concat(currentValue)};

    let ingredientArray = Object.keys(props.ingredients)
            .map(arrayConverter).reduce(reducer, []);

    if(ingredientArray.length === 0) {
        ingredientArray = <p>Please add ingredients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredientArray}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;