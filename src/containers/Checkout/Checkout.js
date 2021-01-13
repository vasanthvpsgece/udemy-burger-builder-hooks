import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux'

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     //super(props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;

    //     for (let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let checkoutSummary = <Redirect to="/" />;

        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased? <Redirect to="/" /> : null;

            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler} 
                        checkoutContinued={this.checkoutContinueHandler} />
                    {/* <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.props.ings} 
                                                    price={this.props.price} 
                                                    {...props} />)} /> */}

                        <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }

        return checkoutSummary;
    }
}

const mapStateToProps = (state) => {
    return({
        ings: state.burgerBuilder.ingredients,
        purchased: state.burgerOrder.purchased
    })
}

export default connect(mapStateToProps)(Checkout);