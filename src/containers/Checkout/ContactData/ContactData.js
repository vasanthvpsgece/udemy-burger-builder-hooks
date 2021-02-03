import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as burgerOrderActions from '../../../redux-store/actions/index'

import { updateObject, checkValidity } from '../../../shared/utilities'

import {connect} from 'react-redux'

const ContactData = (props) => {

    const [stateOrderForm, setStateOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            }, 
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        })

    const [stateFormIsValid, setStateFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for(let formElementIdentifier in stateOrderForm) {
            formData[formElementIdentifier] = stateOrderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onBurgerOrder(order, props.token)
    }

    const inputChangeHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(stateOrderForm[inputIdentifier], 
                                                {value:event.target.value,
                                                 valid: checkValidity(event.target.value, 
                                                                      stateOrderForm[inputIdentifier].validation),
                                                 touched: true})

        const updatedOrderForm = updateObject(stateOrderForm, {[inputIdentifier]: updatedFormElement});

        let formIsValid = true;

        for(let inputElement in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputElement].valid && formIsValid;
        }

        setStateOrderForm(updatedOrderForm);
        setStateFormIsValid(formIsValid);
    }

        let formElementArray = [];

        for(let key in stateOrderForm) {
            formElementArray.push( {
                id: key,
                config: stateOrderForm[key]
            })
        }

        let form = (
            <form onSubmit={(event) => orderHandler(event)}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value} 
                           shouldValidate={formElement.config.validation.required}
                           invalid={!formElement.config.valid}
                           touched={formElement.config.touched}
                           changed={(event) => inputChangeHandler(event, formElement.id)}/>
                                    )               )}
                <Button btnTyp="Success" disabled={!stateFormIsValid}>Order</Button>
            </form>
        );

        if(props.makingRequest) {
             form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h1>Enter your details</h1>
                {form}
            </div>
        );
}

const mapStateToProps = (state) => {
    return({
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        makingRequest: state.burgerOrder.makingRequest,
        token: state.auth.token,
        userId: state.auth.userId
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        onBurgerOrder: (orderData, token) => dispatch(burgerOrderActions.userPlacingOrder(orderData, token))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));