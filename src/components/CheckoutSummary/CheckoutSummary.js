import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {

    return( 
    <div className={classes.CheckoutSummary}>
        <h1>Hope the burger taste well!</h1>
        <div style={{width: '100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnTyp="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
        <Button btnTyp="Success" clicked={props.checkoutContinued}>Order</Button>
    </div>);
}

export default checkoutSummary;