import React, { useEffect, useState } from 'react';
import "./items.styles.css"
import CheckboxInput from '../musicPlayerItems/checkbox-input/checkbox-input.component';
import { ReactComponent as Search2 } from '../../components/asset/search-2.svg';
import { SelectProfileOfSingleArtists } from "../../redux/profile/profile.selectors";
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch, useSelector } from "react-redux";
import { selectCurrentPageText } from '../../redux/songs/songs.selectors';
import { 
    catalogueHolderStart, changeCurrentPageTextStart, 
} from '../../redux/songs/songs.actions';
import { setArtistIdStart } from '../../redux/profile/profile.actions';
import { selectAlbumSongs, selectActivatedSong } from '../../redux/songs/songs.selectors';
import PlayOrPause from '../musicPlayerItems/PlayOrPause/PlayOrPause.component';








const Items = ({obj, HandleImageCheckBox, sorted_search_text, position, 
    currentPageText, HandleClick, activated_Song}) => {
    const dispatch = useDispatch()
    const [list, setList] = useState("")
    const activatedSongID = activated_Song ? activated_Song.id : null
    const albumSongs = useSelector(selectAlbumSongs(list))

    useEffect(() => {
        if (list && albumSongs.length) {
            dispatch(catalogueHolderStart(albumSongs))
            dispatch(changeCurrentPageTextStart('SONGS-COLLECTION-PAGE'))
        }
    },[list, albumSongs])
    
    const NavigateToArtistView = (e, id) => {
        dispatch(setArtistIdStart(id))
        dispatch(changeCurrentPageTextStart('ARTIST-VIEW-PAGE'))
    }
    const HandleHover = (e, obj) => {
        const CheckBox = e.currentTarget.querySelector(".checkbox-1.display-checked")
        if ((obj.id !== activatedSongID) && !CheckBox)
            e.currentTarget.querySelector(".svg-inline--fa.removable").style.display="block"
    }
    const HandleMouseLeave = (e, obj) => {
        if (obj.id !== activatedSongID)
            e.currentTarget.querySelector(".svg-inline--fa.removable").style.display="none"
    }

    return (
        <div 
            id={obj.id}
            onClick={e => (currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text!=="A to Z")
                || currentPageText==='SEARCH-PAGE'
                ? HandleClick(e, obj) 
                : currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text==="A to Z"
                ? NavigateToArtistView(e, obj.id) 
                : currentPageText==='ALBUM-COLLECTION-PAGE' 
                ?  setList(obj.tracks)  
                : null} 
            onMouseMove={e => currentPageText!=='ALBUM-COLLECTION-PAGE' 
            && currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text!=="A to Z"
            || currentPageText==='SEARCH-PAGE'
            ? HandleHover(e, obj)
            : null}
            onMouseLeave={e => currentPageText!=='ALBUM-COLLECTION-PAGE' 
            && currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text!=="A to Z"
            || currentPageText==='SEARCH-PAGE'
            ? HandleMouseLeave(e, obj)
            : null}
            className={`items ${ 
                (obj.selected && activatedSongID===obj.id) ||
                activatedSongID===obj.id  ? 'is-active' 
                : obj.selected ? 'is-selected' 
                : null}`}>

                
            <span className='img-holder'> 
                <img className='img-top' src={require(`../../Media/song-pic/${obj.url}.PNG`)} />
                <CheckboxInput 
                    checked={obj.selected}
                    data={position}
                    inputType='CHECKBOX1'
                    handleChange={(e) => HandleImageCheckBox(e, obj)}
                    name={`imageSelected${position}`}/>
            </span>
            {
                currentPageText==='ALBUM-COLLECTION-PAGE' 
                ? (
                    <div className='text-wrap'>
                        <div className='text'>
                        <span>{
                            obj.album ?
                            (obj.album.length > 20 
                            ? obj.album.slice(0,18) + '...' 
                            :  obj.album)
                            : null
                        }</span>
                        </div>
                        <div className='text'>
                            <span style={{marginRight:"5px"}}>Tracks:</span>
                            <span>{obj.tracks.length + ' tracks'}</span>
                        </div>
                        <div className='text'><span>{obj.artistName}</span></div>
                    </div>)
                : currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text!=="A to Z" 
                || currentPageText==='SEARCH-PAGE'
                ? (
                <div className='text-wrap'>
                    <div className='text'>
                        <span>{
                            obj.title ?
                            (obj.title.length > 15 
                            ? obj.title.slice(0,13) + '...' 
                            :  obj.title)
                            : null
                        }</span>
                    </div>
                    <div className='text'><span>{obj.name}</span></div>
                </div>)  
                : currentPageText==='ARTIST-COLLECTION-PAGE' 
                || (currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text==="A to Z") 
                
                ? (<div className='text-wrap'>
                    <div className='text'><span style={{marginRight:"5px"}}>Name:</span>
                        <span>{
                            obj.name ?
                            (obj.name.length > 15 
                            ?  obj.name.slice(0,13) + '...' 
                            :  obj.name)
                            : null
                        }</span>
                    </div>
                    <div className='text'><span style={{marginRight:"5px"}}>Songs:</span><span>{obj.songs ? (' ' + obj.songs.length + ' songs') : null}</span></div>
                </div>
                )
                : null
            }
            <PlayOrPause obj={obj} activatedSongID={activatedSongID}/>

        </div>
)};

const mapStateToProps = createStructuredSelector({
    currentPageText: selectCurrentPageText,   
    activated_Song: selectActivatedSong,

})
export default connect(mapStateToProps)(Items);


