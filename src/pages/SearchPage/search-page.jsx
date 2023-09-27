import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from "react-redux";
import "./search-page.style.css"
import { 
    selectCatalogueContent,  
    selectActivatedSong, selectAddToPlaylistPanel
} from '../../redux/songs/songs.selectors';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart,
    pushSelectedSongs, 
    changeAddToPlaylistPanel, activatePlayOrPause
} from '../../redux/songs/songs.actions';
import Items from '../../components/items/items.component';



const SearchPage = ({catalogueContent, displayPanel, activatedSong}) => {
    const dispatch = useDispatch()
    const [catalogueSongList, setCatalogueSongList] = useState([])
    const [songList, setSongList] = useState([])

    useEffect(() => {
        console.log(catalogueContent, "catalogueContent")
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
                return found ? {...obj, selected:true} : {...obj, selected:false}
        })
        setCatalogueSongList(list)
    },[songList, catalogueContent])

    const HandleClick = (e, item) => {
        const CheckBox = e.currentTarget.querySelector(".checkbox-1.display-checked")
        if (!CheckBox){
            dispatch(fetchActivatedSongStart(item))
            dispatch(fetchDisplayBottomPlayerStart())
            if (activatedSong){
                if (activatedSong.id === item.id){
                    dispatch(activatePlayOrPause())
                } else dispatch(activatePlayOrPause(true))
            } else dispatch(activatePlayOrPause(true))
        }
        else HandleImageCheckBox(e, item)
    }
    console.log(songList, "B=B=B=B=B")
    
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
            <div className="search-page list-block">
                <div className='search-p__wrap'>
                    <div className='search-p__item list-block'>
                    {
                        catalogueSongList.length
                        ? catalogueSongList.map((obj, idx) => (
                            <Items  
                                position={idx}
                                key={idx} 
                                obj={obj} 
                                HandleClick={HandleClick}
                                HandleImageCheckBox={HandleImageCheckBox}
                                />
                        ))
                        : <span>No Result Found</span>
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
 export default connect(mapStateToProps)(SearchPage);
