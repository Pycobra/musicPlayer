import React, { useEffect, useState } from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
// import { ReactComponent as Search } from '../asset/search-2.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import './form-group.styles.css'

import { selectSearch } from "../../redux/songs/songs.selectors";
import { useSelector } from "react-redux";
import { catalogueHolderStart, changeCurrentPageTextStart } from "../../redux/songs/songs.actions";
import { useDispatch } from "react-redux";




const FormGroup = ({ HeaderType, MenuBarType, SideBarType }) => {
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch()
    const handleInput = (e) => {
        const {value} = e.target
        setSearchText(value)
        dispatch(changeCurrentPageTextStart("SEARCH-PAGE"))
    }
    const search_result = useSelector(selectSearch(searchText))
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    useEffect(() => {
        dispatch(catalogueHolderStart(search_result))
    }, [searchText])
    return (
        <form onSubmit={e => handleSubmit(e)} className={`${
            HeaderType ? "header-form"
            : SideBarType ? "side-bar-form" 
            : MenuBarType ? "menu-bar-form": ''
            } search-form`}>
            <button className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <FormInput  
                inputtype='SearchInputType'
                type="text" 
                placeholder="SEARCH" 
                value={searchText}
                onChange={(e) => handleInput(e)}
                name="search1" 
                required/>
        </form>
    )
}

export default FormGroup;



