import React from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux'

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }


     let checkoutSummary = <Redirect to="/" />;

    if(props.ings) {
            const purchasedRedirect = props.purchased? <Redirect to="/" /> : null;

            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={props.ings} 
                        checkoutCancelled={checkoutCancelledHandler} 
                        checkoutContinued={checkoutContinueHandler} />
                    {/* <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.props.ings} 
                                                    price={this.props.price} 
                                                    {...props} />)} /> */}

                        <Route 
                        path={props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
    }

        return checkoutSummary;
}

const mapStateToProps = (state) => {
    return({
        ings: state.burgerBuilder.ingredients,
        purchased: state.burgerOrder.purchased
    })
}

export default connect(mapStateToProps)(Checkout);