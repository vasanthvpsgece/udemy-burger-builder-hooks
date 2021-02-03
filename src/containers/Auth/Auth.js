import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {checkValidity} from '../../shared/utilities'

import * as actions from '../../redux-store/actions/index'

const Auth = (props) => {

    const [stateControls, setStateControls] = useState ({
            mail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });

    const [stateIsSignup, setStateIsSignup] = useState(true);
    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

    const useEffectFn = () => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }

    useEffect(useEffectFn, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);
    
    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...stateControls,
            [inputIdentifier]: {
                ...stateControls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, stateControls[inputIdentifier].validation),
                touched: true
            }
        };

        setStateControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(stateControls.mail.value,
                     stateControls.password.value,
                     stateIsSignup)
    }

    const switchAuthModeHandler = () => {
        setStateIsSignup(!stateIsSignup);
    }

        const formElementsArray = []

        for(let key in stateControls) {
            formElementsArray.push({
                id: key,
                config: stateControls[key]
            })
        }

        let form = formElementsArray.map(formElement => 
                    <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    shouldValidate={formElement.config.validation.required}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangeHandler(event, formElement.id)} />
                )
        
        if(props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if(props.error) {
            errorMessage = <p>{props.error.message}</p>
        }

        let authRedirect = null;

        if(props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnTyp="Success">Submit</Button>
                </form>
                <Button btnTyp="Danger" 
                        clicked={switchAuthModeHandler}>Switch to {stateIsSignup? "Signin" : "Signup"}</Button>
            </div>
        );
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.buildingBurger,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);