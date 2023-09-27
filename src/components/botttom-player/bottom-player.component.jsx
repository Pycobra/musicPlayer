import React, { useEffect, useRef, useState } from "react";
import "./bottom-player.styles.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ProgressBar from "../musicPlayerItems/ProgressBar/ProgressBar.component";
import Controls from "../musicPlayerItems/Controls/Controls.component";
import TrackDisplay from "../musicPlayerItems/TrackDisplay/TrackDisplay.component";

import { 
    selectAllMySongs, selectActivatedSong,
    selectCurrentPageText, selectCatalogueContent,
    selectedActivatedPlaylist, selectDisplayBottomPlayer,
    selectAddToPlaylistPanel,
} from "../../redux/songs/songs.selectors";
import { fetchActivatedSongStart } from "../../redux/songs/songs.actions";
import { useDispatch } from "react-redux";

const BottomPlayer = ({all_tracks, catalogueContent, activated_song, 
    displayBottomPlayer, activatedPlaylist, currentPageText, 
    bottomPlaylistPanel }) => {
    const dispatch = useDispatch()
    const audioRef = useRef()
    const progressBarRef = useRef()
    const shuffleOn = useRef(false)
    const repeatOn = useRef(false)
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [trackIndex, setTrackIndex] = useState(0)
    const [currentTrack, setCurrentTrack] = useState("")
    const [all_songs, setAll_songs] = useState([])
    useEffect(() => {
        if (currentPageText!=="MY-PLAYLIST"){
            setAll_songs(all_tracks)
        } else  if(currentPageText==="MY-PLAYLIST" && activatedPlaylist){
            try{
                setAll_songs(catalogueContent[activatedPlaylist].playlist)
            } catch{
                console.log()
            }
        }
    }, [currentPageText, activatedPlaylist, catalogueContent])
    useEffect(() => {
        const activatedSongID = activated_song ? activated_song.id : null
        all_songs.find((song, ind) => {
            if (song.id===activatedSongID) {
                setTrackIndex(ind)
                setCurrentTrack(all_songs[ind])
            }
        })

    },[all_songs,activated_song])
    
    useEffect(() => {
        if (all_songs.length)
        dispatch(fetchActivatedSongStart(all_songs[trackIndex]))
    },[trackIndex])
    
    const handleNext= () => {
        if (trackIndex >= all_songs.length - 1){
            setTrackIndex(0)
            setCurrentTrack(all_songs[0])
        } else {
            setTrackIndex((currentTrackIndex) => currentTrackIndex + 1)
            setCurrentTrack(all_songs[trackIndex + 1])
        }
    }
    
    const handleOnEneded = () => {
        if (!shuffleOn.current && !repeatOn.current){ 
            handleNext()
        }
        else if (shuffleOn.current){
            const min = 0
            const max = all_songs.length - 1
            const num = Math.floor((Math.random() * (max - min + 1)) + min)
            setTrackIndex(num)
            setCurrentTrack(all_songs[num])
        }
        else if (repeatOn.current){
            audioRef.current.load()
            audioRef.current.play()
        }
    }

    return (    
        <div className={`bottom-player ${displayBottomPlayer && !bottomPlaylistPanel ? "show" : ""}`}> 
            <div className='wrap'>
                <div className="row row1">
                    <ProgressBar {...{timeProgress, audioRef, duration, progressBarRef,
                        trackIndex, setTrackIndex, setCurrentTrack, 
                        handleNext, shuffleOn, repeatOn, handleOnEneded, all_songs}}/>
                </div>
                <div className="row">
                    <TrackDisplay {...{audioRef, setDuration, progressBarRef, 
                        currentTrack, handleNext, shuffleOn, repeatOn,
                        setTrackIndex, setCurrentTrack, trackIndex, 
                        handleOnEneded }}/>
                    <ProgressBar {...{timeProgress, audioRef, duration, progressBarRef,
                        trackIndex, setTrackIndex, setCurrentTrack, 
                        handleNext, shuffleOn, repeatOn, handleOnEneded, all_songs}}/>
                    <Controls {...{setTimeProgress, audioRef, duration, progressBarRef, 
                        trackIndex, setTrackIndex, setCurrentTrack, handleNext,
                        shuffleOn, repeatOn, handleOnEneded, all_songs }}/>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    currentPageText: selectCurrentPageText,
    activated_song: selectActivatedSong,
    all_tracks: selectAllMySongs,
    catalogueContent: selectCatalogueContent,
    activatedPlaylist: selectedActivatedPlaylist,
    displayBottomPlayer: selectDisplayBottomPlayer,
    bottomPlaylistPanel: selectAddToPlaylistPanel,
})
export default connect(mapStateToProps)(BottomPlayer);


