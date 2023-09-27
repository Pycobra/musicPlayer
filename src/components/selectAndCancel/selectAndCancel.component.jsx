import React, { useEffect, useMemo, useState } from 'react';
import "./selectAndCancel.styles.css"
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeAddToPlaylistPanel } from '../../redux/songs/songs.actions';
import { selectCurrentPageText, selectSortedSearchText } from '../../redux/songs/songs.selectors';






const SelectAndCancel = ({currentPageText, sortedSearchText}) => { 
    const dispatch = useDispatch()
    const DisplayCheckButton = (e, index) => {
        Array.from(document.querySelectorAll('.checkbox-1')).map(itm => itm.classList.toggle('display-checked'))
        Array.from(document.querySelectorAll('.checkbox-2')).map(itm => itm.classList.toggle('display-checked'))
        
        setForCheckbox(forCheckbox.map((i, ind) => 
            ind===index ? {...i, active:false} : {...i, active:true}
        ))
        if (index === 1){
            dispatch(changeAddToPlaylistPanel(false))
        }
    }
    
    const [forCheckbox, setForCheckbox] = useState([
        {name:"Select", 
        element:<div key={0} id='select' onClick={e => DisplayCheckButton(e, 0)}>
                    <span className="html-icon">&#10003;</span><span>Select</span>
                </div>
        }, 
        {name:"Cancel",
        element:<div key={1} id='cancel' onClick={e => DisplayCheckButton(e, 1)}>
                    <span className="html-icon">&#10005;</span><span>Cancel</span>
                </div>
        }
    ])
    useEffect(() => {
        setForCheckbox(forCheckbox.map((i, ind) => 
            ind===0 ? {...i, active:true} : {...i, active:false}
        ))
        Array.from(document.querySelectorAll('.checkbox-1')).map(itm => itm.classList.remove('display-checked'))
        Array.from(document.querySelectorAll('.checkbox-2')).map(itm => itm.classList.remove('display-checked'))
    }, [currentPageText, sortedSearchText])

    return (
                <div className='box b'>{
                    forCheckbox.map(({name, element, active}, ind) => active ? element : null)
                }</div>
    )
 };

const mapStateToProps = createStructuredSelector({
    currentPageText: selectCurrentPageText,
    sortedSearchText: selectSortedSearchText,
})
 export default connect(mapStateToProps)(SelectAndCancel);

