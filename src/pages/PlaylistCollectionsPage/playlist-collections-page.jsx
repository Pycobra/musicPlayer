import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useSelector, useDispatch } from "react-redux";
import "./playlist-collections-page.style.css"
import { selectCatalogueContent, selectedSongsList, 
    selectAddToPlaylistPanel, selectActivatedSong,
    selectCurrentPageText, selectSinglePlaylist,
    selectedActivatedPlaylist, selectedMyPlaylist
} from '../../redux/songs/songs.selectors';
import Items from '../../components/items/items.component';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart,
    sortedSearchTextStart, pushSelectedSongs, 
    changeAddToPlaylistPanel, catalogueHolderStart, 
    activatePlayOrPause
} from '../../redux/songs/songs.actions';
import SongItem from '../../components/song-item/song-item.component';






const PlaylistCollectionPage = ({activatedSong, displayPanel, my_playlist, 
    activatedPlaylist, catalogueContent}) => {
    const dispatch = useDispatch()
    const [catalogueSongList, setCatalogueSongList] = useState([])
    const [songList, setSongList] = useState([])

    const single_playlist = useSelector(selectSinglePlaylist(activatedPlaylist))
    useEffect(() => {
        if (activatedPlaylist) dispatch(catalogueHolderStart(single_playlist))
    },[activatedPlaylist, my_playlist])

    useEffect(() => {
        if (!catalogueContent[0]) {
            const item = catalogueContent[Object.keys(catalogueContent)[0]]
            const list = item.playlist.map((obj, ind) => {
                if (activatedSong){
                    return obj.id===activatedSong.id 
                    ? {...obj, selected:true} : {...obj, selected:false}
                }
            })
            setCatalogueSongList(list)
        }
    },[activatedSong])
    useEffect(() => {
        if (songList && !displayPanel){
            setSongList([])
            dispatch(pushSelectedSongs([]))
        }   
    },[displayPanel])

    useEffect(() => {
        // for some reason catalogueContent still first hold the  last content
        // which are Arrays, so !catalogueContent[0] is meant to only allow access
        // when catalogueContent is not Array and its a Dict
        if (!catalogueContent[0]) {
            const item = catalogueContent[Object.keys(catalogueContent)[0]]
            const list = item.playlist.map((obj, ind) => {
                const found = songList.find((itm) => obj.id===itm.id)
                return found ? {...obj, selected:true} : obj
            })
            setCatalogueSongList(list)
        }
    },[songList, catalogueContent])

    const HandleSongclick = (e, item) => {
        const {type} = e.target
        const CheckBox = e.currentTarget.querySelector(".checkbox-2.display-checked")
        if (!CheckBox){
            dispatch(fetchActivatedSongStart(item))
            dispatch(fetchDisplayBottomPlayerStart(true))
            if (activatedSong){
                if (activatedSong.id === item.id){
                    dispatch(activatePlayOrPause())
                } else dispatch(activatePlayOrPause(true))
            } else dispatch(activatePlayOrPause(true))
        } 
        else HandleImageCheckBox(e, item)
    }
    
    const HandleImageCheckBox = (e, item) => {
        const exists = songList.find(i => i.id === item.id)
        if (!exists){
            setSongList([...songList, item])
            dispatch(pushSelectedSongs([...songList, item]))
        }
        else {
            const newList = songList.filter(i => i.id !== item.id)
            setSongList(newList)
            dispatch(pushSelectedSongs(newList))
        }
        dispatch(changeAddToPlaylistPanel(true))
    }
    return (
            <div className="playlist-collection">
                <div className='playlist-c__wrap'>
                    <div className='playlist-c__item list-block'>
                        {
                            catalogueSongList.length
                            ? catalogueSongList.map((obj, idx) => 
                                <SongItem  
                                    data-id={idx} 
                                    data-obj={obj}
                                    key={idx} 
                                    obj={obj}
                                    index={idx}
                                    HandleSongclick={HandleSongclick}
                                    HandleImageCheckBox={HandleImageCheckBox}
                                    />
                            )
                            : <div style={{display:"grid", gap:"10px", marginTop:"40px"}}>
                                <span style={{fontSize:"20px"}}>Add Songs!</span>
                                <span style={{fontSize:"15px"}}>no songs yet</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
    )
};
const mapStateToProps = createStructuredSelector({
    activatedSong: selectActivatedSong,
    catalogueContent: selectCatalogueContent,
    displayPanel: selectAddToPlaylistPanel,
    activatedPlaylist: selectedActivatedPlaylist,
    my_playlist: selectedMyPlaylist,
})
 export default connect(mapStateToProps)(PlaylistCollectionPage);
