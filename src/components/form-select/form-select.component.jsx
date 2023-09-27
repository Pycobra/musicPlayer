import React, { useState, useEffect } from "react";
import "./form-select.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector} from "reselect"; 




const FormSelect = ({data, handleSelect, sortText, ...otherProps}) => {
    const [sortTextDropDown, setSortTextDropDown] = useState(false)
    useEffect(() => {
        window.onclick = (e) => {
            if (!e.target.closest(".select-fields") && sortTextDropDown){
                setSortTextDropDown(false)
            }
        }
    })
    
    return (
        <div
            className="select-fields"
            {...otherProps}>
            <p onClick={e => setSortTextDropDown((bool) => !bool)}>
                {sortText ? sortText : data[0]}
            </p>
            {
                sortTextDropDown
                ? <ul className="dropddown">
                    {
                        data
                        ? data.map((name, idx) => {
                            return (
                                <li key={idx} 

                                    onClick={e => {
                                        handleSelect(e)
                                        setSortTextDropDown(false)
                                    }}
                                    id={name + `${idx}`} name={name + `${idx}`} 
                                    value={name}>
                                        {name}
                                </li>)
                            
                        })
                        : null
                    }
                </ul>
                : null
            }
        </div>
        )
}
export default FormSelect;

