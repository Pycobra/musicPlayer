import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./add-to-playlist.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faTrash, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { 
    selectedSongsList, selectedMyPlaylist,
    selectedActivatedPlaylist
} from "../../redux/songs/songs.selectors";
import { 
    postSongToPlaylistStart, removeSongFromPlaylistStart,
    changeAddToPlaylistPanel,
} from "../../redux/songs/songs.actions";





const AddToPlaylistFrame = ({songsList, my_playlist, activated_playlist}) => {
    const HandleClick = (e) => {
        const div = document.querySelector(".add-to-playlist-item:first-child")
        if (e.target.className === "add-to-playlist-item display-item"){
            div.classList.remove("display-item")
        }
        else if (e.currentTarget.className === "frame-item plus"){
            div.classList.add("display-item")
        }
    }
    const HandlePlaylistClick = (e, id) => {
        const value = songsList.map(i => i.id)
        dispatch(postSongToPlaylistStart({id, value}))
        dispatch(changeAddToPlaylistPanel(false))
    }
    const HandleDelete = (e)  => {
        const value = songsList.map(i => i.id)
        dispatch(removeSongFromPlaylistStart({id:activated_playlist, value}))
    }
    const dispatch = useDispatch()  
    const [accordionPlaylist, setAccordionPlaylist] = useState(my_playlist)
    useEffect(() => {
        const newList = my_playlist.map(i => {
            return {
                    ...i[Object.keys(i)[0]], 
                    id: Object.keys(i)[0],
                    active: false, 
                    icon:<FontAwesomeIcon icon={faHeadphones}/>,
                    urlString:"MY-PLAYLIST"
                }
        })
        setAccordionPlaylist(newList)
    },[my_playlist])
    return (
        <div className="add-to-playlist-frame">
            <div className="add-to-playlist-wrap">
                <div className="add-to-playlist-item" onClick={e => HandleClick(e)}>
                    <div className="">
                        
                    </div>
                    <div className="frame-item">
                        <ul>
                            {
                                accordionPlaylist.map(({name, id, icon}) =>
                                    <li key={id} onClick={e => HandlePlaylistClick(e, id)}>{icon}<span>{name}</span></li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="add-to-playlist-item">
                    <span className="frame-item">
                        <FontAwesomeIcon icon={faPlay}/>
                        <span className="text">PLAY</span>
                    </span>
                    <span className="frame-item plus" onClick={e => HandleClick(e)}>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span className="text">ADD TO PLAYLIST</span>
                    </span>
                    <span className="frame-item" onClick={e => HandleDelete(e)}>
                        <FontAwesomeIcon icon={faTrash}/>
                        <span className="text">DELETE</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    songsList: selectedSongsList,
    my_playlist: selectedMyPlaylist,
    activated_playlist: selectedActivatedPlaylist
})
 export default connect(mapStateToProps)(AddToPlaylistFrame);


