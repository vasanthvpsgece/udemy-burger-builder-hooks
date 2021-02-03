import React, { Suspense, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout'
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'

import * as actions from './redux-store/actions/index'
import { connect } from 'react-redux';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});

// const Auth = React.lazy(() => {
//   return import('./containers/Auth/Auth')
// });

const App = (props) => {

  const { onTryAutoSignUp } = props;

  const useEffectFn = () => {
    onTryAutoSignUp();
  }

  useEffect(useEffectFn, [onTryAutoSignUp]);

    let routes = (
          <Switch>
            {/* <Route path="/auth" component={Auth} /> */}
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
    );

    if(props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" render={(props) => <Checkout {...props} />} />
            <Route path="/orders" render={(props) => <Orders {...props} />} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      )
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));