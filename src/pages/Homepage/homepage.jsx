import React, {useEffect} from 'react';
import { useState } from 'react';
import "./homepage.styles.css"
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from "react-redux";

import NewPlaylistCard from '../../components/new-playlist-card/new-playlist-card.components';
import { selectSuccessMsg } from '../../redux/songs/songs.selectors';
import { fetchSongFromPlaylistStart } from '../../redux/songs/songs.actions';
import MainApp from '../../components/main-app/main-app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';




 const Homepage = ({successMsg}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSongFromPlaylistStart())
    }, [])
    
    return (
        <div className='homepage'>
            {
                successMsg
                ?   
                <div style={{zIndex:"4"}} className='success-msg'>
                        <div className='text'>
                            <FontAwesomeIcon icon={faHeadphones}/>
                            <span>{successMsg}</span>
                        </div>
                    </div>
                : null
            }
            <div className='homepage-wrap'>
                <div className='homepage-body'>
                    <MainApp />
                    <NewPlaylistCard />
                </div>
            </div>
        </div>
    )
 };

const mapStateToProps = createStructuredSelector({
    successMsg: selectSuccessMsg,
})
//  const mapDispatchToProps = (dispatch) => ({
//     clickedSlideImagesStart: (url) => dispatch(fetchClickedSlideImagesStart(url))
//  })
//  export default Homepage;
 export default connect(mapStateToProps)(Homepage);
