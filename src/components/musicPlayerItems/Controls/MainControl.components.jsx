import React, { useCallback, useEffect, useRef } from "react";
import "./MainControl.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PlayOrPause from "../PlayOrPause/PlayOrPause.component";
import { selectActivatedSong } from "../../../redux/songs/songs.selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faForward, faBackward, 
    faForwardStep, faBackwardStep 
} from "@fortawesome/free-solid-svg-icons"




const MainControl = ({activated_song, audioRef, all_songs, 
    trackIndex, setTrackIndex, setCurrentTrack, handleNext,
    shuffleOn, repeatOn, handleOnEneded}) => {

    const handlePrevious= () => {
        if (trackIndex === 0){
            let lastTrackIndex = all_songs.length - 1;
            setTrackIndex(lastTrackIndex)
            setCurrentTrack(all_songs[lastTrackIndex])
        } else {
            setTrackIndex((currentIndex) => currentIndex - 1)
            setCurrentTrack(all_songs[trackIndex - 1])
        }
    }
    const skipBackward= () => {
        audioRef.current.currentTime -= 10;
    }
    const skipForward= () => {
        audioRef.current.currentTime += 10;
    }
    
    const activatedSongID = activated_song ? activated_song.id : null
    return (
        <div className="box main-control">
            <button onClick={shuffleOn.current || repeatOn.current ? handleOnEneded : handlePrevious}>
                <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={skipBackward}>
                <FontAwesomeIcon icon={faBackward} />
            </button>

            <PlayOrPause obj={activated_song} activatedSongID={activatedSongID} />

            <button onClick={skipForward}>
                <FontAwesomeIcon icon={faForward} />
            </button>
            <button onClick={shuffleOn || repeatOn ? handleOnEneded : handleNext}>
                <FontAwesomeIcon icon={faForwardStep} />
            </button>
        </div>
    )}

    

const mapStateToProps = createStructuredSelector({
    activated_song: selectActivatedSong,
    // all_songs: selectAllMySongs,
})
export default connect(mapStateToProps)(MainControl);
    
    
    


