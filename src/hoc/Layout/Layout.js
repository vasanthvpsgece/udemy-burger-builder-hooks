import React, { useState } from 'react'
import classes from './Layout.module.css';
import Aux from '../Aux/Aux'; // HOC Container
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux';

const Layout = (props) => {
    
    const [stateShowSideDrawer, setStateShowSideDrawer] = useState(false);

    const sideDrawerClosed = () => {
        setStateShowSideDrawer(false);
    }

    const sideDrawerOpened = () => {
        // this.setState((prevState) => {
        //     return {showSideDrawer: !prevState.showSideDrawer};
        // });

        setStateShowSideDrawer(!stateShowSideDrawer)
    }

        return (
            <Aux>
                <Toolbar isAuth={props.isAuthenticated} 
                         clicked={sideDrawerOpened} />
                <SideDrawer isAuth={props.isAuthenticated} 
                            open={stateShowSideDrawer} 
                            clicked={sideDrawerClosed}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);