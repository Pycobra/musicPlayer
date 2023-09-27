import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useSelector, useDispatch } from "react-redux";
import "./song-collections-page.style.css"
import { selectCatalogueContent, selectedSongsList, 
    selectAddToPlaylistPanel, selectActivatedSong,
    selectCurrentPageText
} from '../../redux/songs/songs.selectors';
import Items from '../../components/items/items.component';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart,
    sortedSearchTextStart, pushSelectedSongs, 
    changeAddToPlaylistPanel, activatePlayOrPause
} from '../../redux/songs/songs.actions';
import SongItem from '../../components/song-item/song-item.component';






const SongCollectionsPage = ({activatedSong, displayPanel, catalogueContent}) => {
    const dispatch = useDispatch()
    const [catalogueSongList, setCatalogueSongList] = useState([])
    const [songList, setSongList] = useState([])
    useEffect(() => {
        var list = catalogueContent.map((obj, ind) => {
            if (activatedSong){
                return obj.id===activatedSong.id 
                ? {...obj, selected:true} : {...obj, selected:false}
            }
            return obj
        })
        setCatalogueSongList(list)
    },[activatedSong, catalogueContent])
    useEffect(() => {
        if (songList && !displayPanel){
            setSongList([])
            dispatch(pushSelectedSongs([]))
        }   
    },[displayPanel])
    useEffect(() => {
        const list = catalogueContent.map((obj, ind) => {
            const found = songList.find((itm) => obj.id===itm.id)
            return found ? {...obj, selected:true} : obj
        })
        setCatalogueSongList(list)
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
            <div className="song-collection listing">
                <div className='song-c__wrap'>
                    <div className='song-c__item list-block'>
                        {
                            catalogueSongList.map((obj, idx) => 
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
})
 export default connect(mapStateToProps)(SongCollectionsPage);
