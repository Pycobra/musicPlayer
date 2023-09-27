import React, { useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./side-bar.styles.css";
import { 
    selectedMyPlaylist, SelectSortedSongs, 
    selectedActivatedPlaylist, selectAllMySongs
} from "../../redux/songs/songs.selectors";
import { ProfileAllArtists } from "../../redux/profile/profile.selectors";
import FormGroup from "../form-group/form-group.components";
import { 
    changeCurrentPageTextStart, catalogueHolderStart,
    sortedSearchTextStart, changeAddToPlaylistPanel,
    pushSelectedSongs, activatedPlaylistStart,
} from "../../redux/songs/songs.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faAppleAlt, faBarcode, faGamepad, 
    faHeadphones, faMessage, faPlus, 
    faMusic,
    faFloppyDisk,
    faUser,
    faCompactDisc,
    faChartBar,
    faChartLine,
    faChartColumn,
    faChartPie,
    faChartSimple
} from "@fortawesome/free-solid-svg-icons"







const SideBar = ({profileAllArtists, my_playlist, all_songs, activatedPlaylist}) => {
    const dispatch = useDispatch()
    const HideSideBar = (e) => {
        document.querySelector('#side-bar .content .box-1').classList.toggle('hide-element')
        document.querySelector('#side-bar').classList.toggle('hide-element')
        document.querySelector('main .main-wrapper #container').classList.toggle('adjust-container')
        document.querySelector('.homepage > .homepage-wrap > .homepage-body').classList.toggle('increase-body')
    }  
    const [accordion, setAccordion] = useState([
        {name:"Collections", icon:<FontAwesomeIcon icon={faCompactDisc}/>, active:false, urlString:"ALBUM-COLLECTION-PAGE"}, 
        {name:"Artist", icon:<FontAwesomeIcon icon={faUser}/>, active:false, urlString:"SORTED-SEARCH-PAGE"}, 
        {name:"Songs", icon:<FontAwesomeIcon icon={faMusic}/>, active:false, urlString:"SONGS-COLLECTION-PAGE"}, 
        {name:"Now Playing", icon:<FontAwesomeIcon icon={faChartSimple}/>, active:false, urlString:"NOW-PLAYING-PAGE"}, 
        {name:"New Playlist", icon:<FontAwesomeIcon icon={faPlus}/>, active:false, urlString:"NEW-PLAYLIST"},
    ])

       
    const [accordionPlaylist, setAccordionPlaylist] = useState(my_playlist)
    const [accordionID, setAccordionID] = useState()
    var sorted_albums = useSelector(SelectSortedSongs("Album"))
    useEffect(() => {
        const newAccordion = accordion.map((i,idx) => 
            accordionID===i.name ? {...i, active:true} : {...i, active:false})
        setAccordion(newAccordion)
    },[accordionID])
    
    useEffect(() => {
            const newList = my_playlist.map(i => {
                return {
                        ...i[Object.keys(i)[0]], 
                        id: Object.keys(i)[0],
                        active: false, 
                        icon:<FontAwesomeIcon icon={faHeadphones}/>,
                        urlString:"MY-PLAYLIST"
                    }
            }).map(i => {
                    return i.id===activatedPlaylist ? {...i, active: true} 
                    : {...i, active: false} 
                })
            setAccordionPlaylist(newList)
    },[my_playlist, activatedPlaylist])
    const handlePageChange = (e, id, urlString) => {
        setAccordionID(id)
        if (urlString!=='NEW-PLAYLIST') dispatch(changeCurrentPageTextStart(urlString))
        if (urlString!=='MY-PLAYLIST') dispatch(activatedPlaylistStart())
        if (urlString==='ALBUM-COLLECTION-PAGE'){
            dispatch(catalogueHolderStart(sorted_albums))
        }
        if (urlString==='SORTED-SEARCH-PAGE'){
            dispatch(sortedSearchTextStart("A to Z"))
            dispatch(catalogueHolderStart(profileAllArtists))
        }
        if (urlString==='SONGS-COLLECTION-PAGE'){
            dispatch(catalogueHolderStart(all_songs))
        }      
        if (urlString==="MY-PLAYLIST"){
            dispatch(activatedPlaylistStart(id))
        }  
        const Card=document.querySelector('.new-playlist-card')
        Card.classList.remove('show-new-playlist-card')        
        if (urlString==='NEW-PLAYLIST'){
            Card.classList.toggle('show-new-playlist-card')
            Card.dataset.name = "AddPlaylist"
        }
        
        dispatch(changeAddToPlaylistPanel(false))
        dispatch(pushSelectedSongs())
        //to remove playlist popup
        const div = document.querySelector(".add-to-playlist-item:first-child")
        if(div) div.classList.remove("display-item")
    }

    return (
        <div id="side-bar">
            <div className="content">
                
                <div className="box-1">
                    <div onClick={e => HideSideBar(e)} className="menubar">
                        <div className="html-icon">
                            <FontAwesomeIcon className="hide" icon={faBarcode}/>
                        </div>
                    </div>
                    <div className='site-icon'>
                        <div className="logo">
                            <span>BRIGHT</span><span>Music</span>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="block-1 blocks">
                            {
                                accordion.map(({name, active, icon, urlString}, ind) => {
                                    if (name !== accordion.slice(-1)[0].name){
                                        return <div key={ind} 
                                                    onClick={e =>  handlePageChange(e, name, urlString)} 
                                                    className={`icon ${active ? "active": ""}${ind===0 ? " more-space": ""}`}>
                                                    <span className="html-icon">{icon}</span>
                                                </div>
                                    }
                                })
                            }
                        </div>
                        <div className="block-2 blocks">
                            <div onClick={e => handlePageChange(e, null, accordion.slice(-1)[0].urlString)} 
                                className={`icon ${accordion.slice(-1)[0].active ? "active": ""}`}>
                                <span className="html-icon">{accordion.slice(-1)[0].icon}</span>
                            </div>
                            {
                                accordionPlaylist.map(({name, active, id, icon, urlString}) => 
                                    <div 
                                        key={id}
                                        onClick={e => handlePageChange(e, id, urlString)} 
                                        className={`icon ${active ? "active": ""}`}>
                                        <span className="html-icon">{icon}</span>
                                    </div>
                                )
                            }
                            <div className="icon"></div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="block-1 blocks">
                            {
                                accordion.map(({name, active, urlString}, ind) => {
                                    if (name !== accordion.slice(-1)[0].name){
                                        return <span 
                                                key={ind} 
                                                onClick={e => {handlePageChange(e, name, urlString)}}
                                                className={`list ${active ? "active": ""}${ind===0 ? " more-space": ""}`}>
                                                    {name}
                                                </span>
                                    }
                                })
                            }
                        </div>
                        <div className="block-3 blocks">
                            <span 
                                onClick={e => handlePageChange(e, null, accordion.slice(-1)[0].urlString)}
                                className={`list ${accordion.slice(-1)[0].active ? "active": ""}`}>
                                    {accordion.slice(-1)[0].name}
                            </span>
                            {
                                accordionPlaylist.map(({name, active, id, icon, urlString}, ind) => 
                                <span 
                                    key={id}
                                    onClick={e => handlePageChange(e, id, urlString)}
                                    className={`list ${active ? "active": ""}`}>
                                        {name}
                                </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    profileAllArtists: ProfileAllArtists,
    my_playlist: selectedMyPlaylist,
    activatedPlaylist: selectedActivatedPlaylist,
    all_songs: selectAllMySongs,
})
 export default connect(mapStateToProps)(SideBar);
