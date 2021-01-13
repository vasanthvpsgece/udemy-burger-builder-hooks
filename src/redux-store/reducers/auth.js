import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utilities'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {toke: action.idToken, userId: action.userId, error: null, loading: false});
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {error: action.error, loading: false})
        case actionTypes.LOGOUT:
            return updateObject(state, {toke: null, userId: null})
        default:
            return state;
    }
}

export default reducer;