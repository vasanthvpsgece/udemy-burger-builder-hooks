import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actions from '../../../redux-store/actions/index'

const Logout = (props) => {

    const {onLogout} = props;

    const useEffectFn = () => {
        onLogout();
    }
 
    useEffect(useEffectFn, [onLogout]);

    return <Redirect to="/" />;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);