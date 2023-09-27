import React from "react";
import "./ProgressBar.styles.css";
import MainControl from "../Controls/MainControl.components";




const ProgressBar = ({timeProgress, duration, audioRef, progressBarRef,
    trackIndex, setTrackIndex, setCurrentTrack, all_songs,
    handleNext, shuffleOn, repeatOn, handleOnEneded}) => {
    
    const HandleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value
    }

    const FormatTime = (time) => {
        if (time && !isNaN(time)){
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}` 
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
            return `${formatMinutes}:${formatSeconds}`
        }
        return '00:00'
    }

    return(
    <div className="progress-bar">
        <div className="box">
            <span className='time current'>{FormatTime(timeProgress)}</span>
            <input type="range" 
                ref={progressBarRef}
                defaultValue="0"
                onChange={HandleProgressChange} />
            <span className='time total'>{FormatTime(duration)}</span>
        </div>
        <MainControl {...{ audioRef, trackIndex, setTrackIndex, setCurrentTrack, 
            handleNext, shuffleOn, repeatOn, handleOnEneded, all_songs}}/>

    </div>
    )}
    
 export default ProgressBar;


