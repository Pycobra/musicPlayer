import React, { useState } from "react";
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import FormInput from "../form-input/form-input.component";
import './new-playlist-card.styles.css'
import CustomButton from "../custom-button/custom-button.component";
import { createPlaylistStart } from "../../redux/songs/songs.actions";
import { useDispatch } from "react-redux";
import { selectedActivatedPlaylist } from '../../redux/songs/songs.selectors';


const NewPlaylistCard = ({activatedPlaylist}) => {
    const CancelCard = () => {
        window.onclick = (e) => {
            if (e.target.classList.contains('new-playlist-card')){
                document.querySelector('.homepage > .homepage-wrap > .homepage-body > .new-playlist-card')
                        .classList.remove('show-new-playlist-card')
            }
        }
    }
    const [playlistName, setPlaylistName] = useState("")
    const HandleChange = (e) => {
        const {name, value} = e.target
        setPlaylistName(value)
    }
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const Card=document.querySelector('.new-playlist-card')
        dispatch(createPlaylistStart({playlistName, activatedPlaylist, action:Card.dataset.name}))
        Card.classList.toggle('show-new-playlist-card')
    }
    return (
        <div className="new-playlist-card" onClick={e => CancelCard()}>
            <div className='card-wrap' >
                <span>Name This Playlist</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name="playlistName" 
                        value={playlistName} 
                        type="text"
                        required
                        onChange={e => HandleChange(e)}
                        inputtype='FlatInputType'/>
                    <CustomButton buttonType="FlatButton" >Save</CustomButton>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    activatedPlaylist: selectedActivatedPlaylist

})
 export default connect(mapStateToProps)(NewPlaylistCard);


