import React from "react";
import "./TrackDisplay.styles.css";





const TrackDisplay = ({audioRef, setDuration, progressBarRef, 
    currentTrack, handleOnEneded }) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds)
        progressBarRef.current.max = seconds
    }
    
    const {name, title, label, url,} = currentTrack ? currentTrack : ""
    const currentPlayingAudio = currentTrack ? currentTrack.audio : null
    return (    
        <div className='track-display'>
            <audio 
                src={ 
                    currentPlayingAudio 
                    ? require(`../../../Media/audio/${currentPlayingAudio}`)
                    : null
                }
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleOnEneded}/>
            <div className='box-1'>
                <span className='img-holder'> 
                { url
                    ? <img className='img-top' src={require(`../../../Media/song-pic/${url}.PNG`)} />
                    : null
                }
                </span>
                <div> 
                    <span className='song'>{`${
                        name ? 
                        (name.length>15 ? name.slice(0,15)+".." : name + ' || ' + 
                        label)
                        : null
                        }`}</span>
                    <span className='name'>{
                        title ? 
                        (title.length>22 ? title.slice(0,22)+'...'  : title)
                        : null
                        }</span>
                </div>
            </div>
        </div>
    )
}




 export default TrackDisplay;

