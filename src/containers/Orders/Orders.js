import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/OrderSummary/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../redux-store/actions/index'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder();
        // axios.get('/orders.json')
        // .then(res => {
        //     let fetchedOrders = [];
        //     for(let key in res.data) {
        //         fetchedOrders.push({...res.data[key], id: key});
        //     }
        //     this.setState({orders: fetchedOrders, loading:false})
        // })
        // .catch(res => {
        //     this.setState({loading: false})
        // })
    }

    render() {

        let orders = <Spinner />;
        
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (<Order 
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
}

const mapStateToProps = (state) => {
    return {
        orders: state.burgerOrder.orders,
        loading: state.burgerOrder.makingRequest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));