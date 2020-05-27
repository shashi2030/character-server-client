import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Checkbox = props =>{
    return <label ><input type="checkbox" id={props.item} onClick={(e)=>props.handleFilter(e, props.option)} /> {props.item}</label>
}