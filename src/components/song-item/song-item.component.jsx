import React from 'react';
import "./song-item.styles.css"
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckboxInput from '../musicPlayerItems/checkbox-input/checkbox-input.component';
import PlayOrPause from '../musicPlayerItems/PlayOrPause/PlayOrPause.component';
import { selectActivatedSong } from '../../redux/songs/songs.selectors';




const SongItem = ({HandleSongclick, activated_Song, 
    HandleImageCheckBox, index, obj, dispatch, ...otherProps}) => {
    const activatedSongID = activated_Song ? activated_Song.id : null
    
    const HandleHover = (e, obj) => {
        const CheckBox = e.currentTarget.querySelector(".checkbox-2.display-checked")
        if ((obj.id !== activatedSongID) && !CheckBox)
            e.currentTarget.querySelector(".svg-inline--fa.removable").style.display="block"
    }
    const HandleMouseLeave = (e, obj) => {
        if (obj.id !== activatedSongID)
            e.currentTarget.querySelector(".svg-inline--fa.removable").style.display="none"
    }
    return (
            <span {...otherProps}
                    onClick={e => HandleSongclick(e, obj)}
                    onMouseMove={e => HandleHover(e, obj)}
                    onMouseLeave={e => HandleMouseLeave(e, obj)}
                    className='song-li'>
                        
                <div className={`song-li-wrap ${obj.selected ? 'song-li-change-bg' : ""}`}
                    id={`${index % 2 === 0 ? 'site-black-color' : 'normal-black-color'}`}>
                    <div className='item-1 re-spacing'>
                        <div className='place-1'>
                            <CheckboxInput 
                                checked={obj.selected}
                                data={index}
                                inputType='CHECKBOX2'
                                handleChange={(e) => HandleImageCheckBox(e, obj)}
                                name={`imageSelected${index}`}/>
                            <div className="div1">{obj.title + '...'}</div>
                            <div className="div2">
                                <span>{obj.title.length > 15 ? obj.title + '...' : obj.title}</span>
                                <span className='double-bar'>||</span>
                                <span>{obj.label.length > 15 ? obj.label + '...' : obj.label} Record</span>
                            </div>
                        </div>
                    </div>
                    <span className='item-2'>{obj.name.length > 15 ? obj.name + '...' : obj.name}</span>
                </div>
                <PlayOrPause obj={obj} activatedSongID={activatedSongID}/>      
            </span>
)};


const mapStateToProps = createStructuredSelector({  
    activated_Song: selectActivatedSong,

})
export default connect(mapStateToProps)(SongItem);
