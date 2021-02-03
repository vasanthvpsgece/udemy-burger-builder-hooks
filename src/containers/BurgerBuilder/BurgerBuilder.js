import React, {useState, useEffect, useCallback} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../redux-store/actions/index'

const BurgerBuilder = (props) => {

    const [statePurchasing, setStatePurchasing] = useState(false);
   
    const dispatch = useDispatch();
    const onIngredientAdd = (ingName) => dispatch(actionCreators.addIngredient(ingName));
    const onIngredientRemove = (ingName) => dispatch(actionCreators.removeIngredient(ingName));
    const initIngredient = useCallback(() => dispatch(actionCreators.fetchIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actionCreators.orderInit());
    const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path));

    const [ings, price, error, isAuthenticated] = useSelector( state => {
                                                                    return [state.burgerBuilder.ingredients,
                                                                    state.burgerBuilder.price,
                                                                    state.burgerBuilder.error,
                                                                    state.auth.token !== null]
                                                                })

    const useEffectFn = () => {
        if(!ings) {
            initIngredient();
        }
    }

    useEffect(useEffectFn, [ings, initIngredient]);

    const updatePurchasableState = (ingredients) => {
        const newPurchasable = Object.keys(ingredients)
                                .map( igKey => (ingredients[igKey]))
                                .reduce((acc, cur) => (acc+cur), 0);

        return (newPurchasable > 0);
    }

    const orderNowHandler = () => {

        onInitPurchase();
        
        if(isAuthenticated) {
            setStatePurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setStatePurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
    }

        const disabledInfo = {...ings};
        let burger = error? <p>Error while retrieving Data</p> : <Spinner />;
        let orderSummary = null;

        if(ings) {
            burger = (
                <Aux>
                    <Burger ingredients={ings} />
                    <BurgerControls less={onIngredientRemove} 
                                    more={onIngredientAdd} 
                                    disabled={disabledInfo}
                                    price={price}
                                    isAuthenticated={isAuthenticated}
                                    purchasable={updatePurchasableState(ings)}
                                    clicked={orderNowHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={ings} 
                                            price={price}
                                            cancelBtn={purchaseCancelHandler}
                                            continueBtn={purchaseContinueHandler}/>;


        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={statePurchasing} modalClicked={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
}


export default withErrorHandler(BurgerBuilder, axios);