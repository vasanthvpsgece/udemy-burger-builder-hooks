import React from 'react'
import classes from './Input.module.css'

const input = (props) => {

    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if(props.shouldValidate && props.touched && props.invalid) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;

        case ('textarea'):
            inputElement = <textaread className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        
        default:
            inputElement = <input className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
    }

    return(
        <div className={classes.Input} >
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;