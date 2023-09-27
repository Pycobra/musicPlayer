import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./VolumeControl.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeOff, faVolumeLow, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"




const VolumeControl = ({audioRef}) => {
    const [volume, setVolume] = useState(60)
    const [muteVolume, setMuteVolume] = useState(false)
    useEffect(() => {
        if (audioRef){
            audioRef.current.volume = volume / 100
            audioRef.current.muted = muteVolume
        }
        window.onclick = (e) => {
            const rangeBox = document.querySelector(".volume .range-box")
            if (e.target.parentElement.closest(".main-btn") && rangeBox)
                rangeBox.classList.add("show")
            else if (!e.target.closest(".volume") && rangeBox)
                rangeBox.classList.remove("show")
        }
    }, [volume, audioRef, muteVolume])
    return(
        <div className="volume">
            <button className="main-btn">
                {muteVolume ? (
                    <FontAwesomeIcon icon={faVolumeMute}/>
                ) : volume < 10 ? (
                    <FontAwesomeIcon icon={faVolumeLow}/>
                ) : volume < 50 ? (
                    <FontAwesomeIcon icon={faVolumeLow}/>
                ) : (
                    <FontAwesomeIcon icon={faVolumeHigh}/>
                )}
            </button>
            <span className="range-box">
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume ? (
                        <FontAwesomeIcon icon={faVolumeMute}/>
                    ) : volume < 50 ? (
                        <FontAwesomeIcon icon={faVolumeLow}/>
                    ) : (
                        <FontAwesomeIcon icon={faVolumeHigh}/>
                    )}
                </button>
                <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={volume}
                    style={{background: "linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%"}}
                    onChange={(e) => setVolume(e.target.value)}/>
                </span>
        </div>
    )}
    
 export default VolumeControl;


