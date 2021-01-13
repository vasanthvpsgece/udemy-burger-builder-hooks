import React from 'react'
import classes from './Order.module.css'

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName,
                          amount: props.ingredients[ingredientName]
                        })
    }

    const ingredientsOutput = ingredients.map(igKey =>{
        return (<span key={igKey.name}
                      style={{
                          textTransform: 'capitalize',
                          display: 'inline-block',
                          margin: '0 3px',
                          border: '1px solid #ccc',
                          padding: '5px'
                        }}>{igKey.name} ({igKey.amount}) </span>)
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default order;