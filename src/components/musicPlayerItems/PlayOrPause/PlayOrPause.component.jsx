import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./PlayOrPause.styles.css";
import { selectPlayOrPause, selectActivatedSong} from "../../../redux/songs/songs.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle, faPauseCircle, faCab } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux";
import { activatePlayOrPause } from "../../../redux/songs/songs.actions";



const PlayOrPause = ({activatedSongID, playOrPause, obj}) => {
    const dispatch = useDispatch()
    return (
        activatedSongID===obj.id && playOrPause  
        ? <FontAwesomeIcon onClick={e => dispatch(activatePlayOrPause())} icon={faPauseCircle}/>
        : activatedSongID===obj.id && !playOrPause
        ? <FontAwesomeIcon onClick={e => dispatch(activatePlayOrPause())} icon={faPlayCircle}/>
        : <FontAwesomeIcon style={{display:"none"}} className="removable" icon={faPlayCircle}/>
    )}
    
const mapStateToProps = createStructuredSelector({
    playOrPause: selectPlayOrPause,
    activated_song: selectActivatedSong
})
 export default connect(mapStateToProps)(PlayOrPause);


