
import React from 'react';
import "./form-input.styles.css"

const FormInput = ({children, handleChange, label, ...otherProps}) => {
    const {shrinkinputtype, issearch, homepage, roundbordertype, inputtype} = {...otherProps}
    return (
        shrinkinputtype==="true"
        ? (
            <div className="group">
                <input className={`input-field ${
                inputtype==='SearchInputType' ? 'search-input'
                : inputtype==='FlatInputType' ? 'flat-input'
                : ""}
                ${issearch==="true" ? 'issearch' : null} group-form-input`} 
                onChange={handleChange} {...otherProps} >
                </input>
                {
                label 
                ? (<label className={`${otherProps.value.length ? 'shrink' : ''} ${issearch==="true" ? 'issearch' : null} group-form-input-label`} >{label}</label>)
                : null
                }
            </div>
            )
        
        : 
        <input 
            className={`${
                inputtype==='SearchInputType' ? "search-input"
                : inputtype==='FlatInputType' ? 'flat-input'
                : ''
                } input-fields`
            } 
            {...otherProps}>
                
            {/* { children } */}
        </input>
        )
}
export default FormInput;