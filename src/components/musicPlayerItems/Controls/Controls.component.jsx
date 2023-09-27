import React, { useCallback, useEffect, useRef } from "react";
import "./Controls.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import VolumeControl from "../VolumeControl/VolumeControl.component";
import MainControl from "./MainControl.components";

import { 
    selectPlayOrPause, selectActivatedSong,
} from "../../../redux/songs/songs.selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faRepeat, faShuffle
} from "@fortawesome/free-solid-svg-icons"




const Controls = ({playOrPause, activated_song, setTimeProgress, 
    audioRef, duration, progressBarRef, trackIndex,
    shuffleOn, repeatOn, setTrackIndex, setCurrentTrack, 
    handleNext, handleOnEneded, all_songs
    }) => {

    const playAnimationRef = useRef()

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );
        playAnimationRef.current = requestAnimationFrame(repeat);
    },[duration, progressBarRef, audioRef, setTimeProgress])

    const shuffleRandomPlay= () => { 
        shuffleOn.current=!shuffleOn.current
        repeatOn.current=false
    }
    const repeatCurrentPlay= () => {
        repeatOn.current=!repeatOn.current
        shuffleOn.current=false
    }

    useEffect(() => {
        if (activated_song && playOrPause){
            audioRef.current.play()
        } else if (activated_song && !playOrPause){
            audioRef.current.pause()
        }
        playAnimationRef.current = requestAnimationFrame(repeat)
    },[activated_song, playOrPause, audioRef, repeat])
    
    return (
        <div className="controls">
            <MainControl {...{ audioRef, trackIndex, setTrackIndex, setCurrentTrack, 
                handleNext, shuffleOn, repeatOn, handleOnEneded, all_songs}}/>
            <div className="box">
                <button className={`shuffle ${shuffleOn.current ? "active" : ""}`} 
                    onClick={shuffleRandomPlay}>
                    <FontAwesomeIcon icon={faShuffle} />
                </button>
                <button className={`repeat ${repeatOn.current ? "active" : ""}`} 
                    onClick={repeatCurrentPlay}>
                    <FontAwesomeIcon icon={faRepeat} />
                </button>
            </div>
            <div className="box">
                <VolumeControl audioRef={audioRef} />
            </div>
        </div>
    )}

    

const mapStateToProps = createStructuredSelector({
    playOrPause: selectPlayOrPause,
    activated_song: selectActivatedSong,
})
export default connect(mapStateToProps)(Controls);
    
    
    


