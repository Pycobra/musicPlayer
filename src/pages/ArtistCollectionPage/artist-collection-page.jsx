import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from "react-redux";
import "./artist-collection-page.style.css"
import { 
    selectCatalogueContent,
    selectSortedSearchText, selectedSongsList, 
    selectActivatedSong, selectAddToPlaylistPanel
} from '../../redux/songs/songs.selectors';
import Items from '../../components/items/items.component';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart,
    pushSelectedSongs, 
    changeAddToPlaylistPanel, activatePlayOrPause
} from '../../redux/songs/songs.actions';




const ArtistCollectionPage = ({catalogueContent, displayPanel, activatedSong, 
    sorted_search_text}) => {    
    const dispatch = useDispatch()
    const [catalogueSongList, setCatalogueSongList] = useState([])
    const [songList, setSongList] = useState([])

    useEffect(() => {
        var list = catalogueContent.map((itm, ind) => {
            return itm.map((obj) => {
                if (activatedSong){
                    return obj.id===activatedSong.id 
                    ? {...obj, selected:true} : {...obj, selected:false}
                }
                return obj
            })
        })
        setCatalogueSongList(list)
    },[activatedSong, sorted_search_text])
    useEffect(() => {
        if (songList && !displayPanel){
            setSongList([])
            dispatch(pushSelectedSongs([]))
        }   
    },[displayPanel])
    useEffect(() => {
        const list = catalogueContent.map((itm, ind) => {
            return itm.map((obj) => {
                const found = songList.find((itm) => obj.id===itm.id)
                return found ? {...obj, selected:true} : {...obj, selected:false}
            })
        })
        setCatalogueSongList(list)
    },[songList, sorted_search_text])

    const HandleClick = (e, item) => {
        const CheckBox = e.currentTarget.querySelector(".checkbox-1.display-checked")
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
            <div className="artist-collection">
                <div className='artist-c__wrap'>
                    <div className='artist-c__item list-block'>
                        {
                            catalogueSongList
                            ? catalogueSongList.map((sort_array, indx) => {
                                var cnt = 0
                                return (
                                <div key={indx} className='sorted-item-wrap'>
                                    <span className='sort-head'>{
                                        sorted_search_text==="A to Z"
                                        ? sort_array[0].name.slice(0,1)
                                        : sorted_search_text==="Artist"
                                        ? sort_array[0].name
                                        : sorted_search_text === 'Genre'
                                        ? sort_array[0].genre
                                        : sorted_search_text === 'Release Year'
                                        ? sort_array[0].release_year
                                        : sorted_search_text === 'Label'
                                        ? sort_array[0].label + ' Record'
                                        : null
                                    }</span>
                                    <div className='sorted'>
                                        {
                                            sort_array.map((obj, idx) => {
                                            cnt ++
                                            return (
                                                <Items
                                                    position={cnt} key={`${indx}-${idx}`} 
                                                    obj={obj} 
                                                    sorted_search_text={sorted_search_text}
                                                    HandleClick={HandleClick}
                                                    HandleImageCheckBox={HandleImageCheckBox}
                                                    />
                                            )})
                                        }
                                    </div>
                                </div>
                            )})
                            : null
                        }
                    </div>
                </div>
            </div>
    )
};
const mapStateToProps = createStructuredSelector({
    activatedSong: selectActivatedSong,
    catalogueContent: selectCatalogueContent,
    songList: selectedSongsList,
    sorted_search_text: selectSortedSearchText,
    displayPanel: selectAddToPlaylistPanel,
})
 export default connect(mapStateToProps)(ArtistCollectionPage);
