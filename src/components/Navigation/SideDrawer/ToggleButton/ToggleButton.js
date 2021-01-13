import React from 'react'
import Logo from '../../../Logo/Logo'
import classes from './ToggleButton.module.css';

const toggleButton = (props) => {

    return (
        <div className={classes.Logo} onClick={props.clicked}>
            <Logo />
        </div>
    );
}

export default toggleButton;