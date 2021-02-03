import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/OrderSummary/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../redux-store/actions/index'

const Orders = props => {

    const {onFetchOrder, token, userId} = props;

    const useEffectFn = () => { onFetchOrder(token, userId); }
    useEffect(useEffectFn, [onFetchOrder, token, userId]);

    let orders = <Spinner />;
        
    if(!props.loading) {
            orders = props.orders.map(order => (<Order 
                                                        key={order.id}
                                                        ingredients={order.ingredients}
                                                        price={order.price} />))
    }

    return(
            <div>
                {orders}
            </div>
    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.burgerOrder.orders,
        loading: state.burgerOrder.makingRequest,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));