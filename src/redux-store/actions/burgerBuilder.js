import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_ING,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REM_ING,
        ingredientName: ingName
    }
}

export const setInitialIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INIT_ING,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.ING_FETCH_FAIL
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setInitialIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}