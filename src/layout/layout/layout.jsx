import React, {useEffect, useRef } from 'react';
import "./layout.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from "react-redux";

import SideBar from '../../components/side-bar/side-bar.components';
import BottomPlayer from '../../components/botttom-player/bottom-player.component';
import { 
    selectDisplayBottomPlayer, 
    selectActivatedSong, selectAddToPlaylistPanel,
} from '../../redux/songs/songs.selectors';
import { fetchSongFromPlaylistStart } from '../../redux/songs/songs.actions';
import AddToPlaylistFrame from '../../components/add-to-playlist/add-to-playlist.component';
import Homepage from '../../pages/Homepage/homepage';






 const Layoutpage = ({activatedSong, bottomPlaylistPanel, displayBottomPlayer}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSongFromPlaylistStart())
    }, [])
    return (
        <div className='layout'>
            <div className='main-layout'>
                <main>
                  <div className={`main-wrapper ${
                    activatedSong && displayBottomPlayer && !bottomPlaylistPanel
                    ? 'reduce-height-for-btm-player' : ""
                    }`}>
                    <SideBar />
                    <div id='container' className='container'>
                          <Router>
                              <Routes>
                                  <Route path='/*' element={<Homepage />} /> 
                              </Routes>
                          </Router>
                    </div>
                  </div>
                  {
                      activatedSong 
                      ? <BottomPlayer layOutRef={layOutRef} activatedSong={activatedSong}/>
                      : null
                  }
                  
                  {
                    bottomPlaylistPanel ? <AddToPlaylistFrame /> : null
                  }
                </main>
            </div>
        </div>
    )
 };

const mapStateToProps = createStructuredSelector({
    displayBottomPlayer: selectDisplayBottomPlayer,
    activatedSong: selectActivatedSong,
    bottomPlaylistPanel: selectAddToPlaylistPanel,
})
 export default connect(mapStateToProps)(Layoutpage);
