import React, { useEffect, useMemo, useState } from 'react';
import "./main-app.styles.css"
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart,
    sortedSearchTextStart,
    catalogueHolderStart, changeCurrentPageTextStart, 
    changeAddToPlaylistPanel, deletePlaylistStart 
} from '../../redux/songs/songs.actions';
import { 
    SelectSortedSongs, 
    selectSortedSearchText, selectCatalogueContent,
    selectCurrentPageText, selectActivatedSong,
    selectDisplayBottomPlayer, selectAddToPlaylistPanel,
    selectedActivatedPlaylist,
} from '../../redux/songs/songs.selectors';

import FormSelect from '../form-select/form-select.component';
import FormGroup from '../form-group/form-group.components';
import Items from '../items/items.component';
import SongItem from '../song-item/song-item.component';
import AlbumCollectionsPage from '../../pages/AlbumCollectionsPage/album-collections-page';
import SongCollectionsPage from '../../pages/SongCollectionsPage/song-collections-page';
import ArtistCollectionPage from '../../pages/ArtistCollectionPage/artist-collection-page';
import NowPlayingPage from '../../pages/NowPlayingPage/now-playing-page';
import ArtistView from '../../pages/ArtistViewPage/artist-view-page';
import PlaylistCollectionPage from '../../pages/PlaylistCollectionsPage/playlist-collections-page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import SelectAndCancel from '../selectAndCancel/selectAndCancel.component';
import searchPage from '../../pages/SearchPage/search-page';
import SearchPage from '../../pages/SearchPage/search-page';






const MainApp = ({catalogueContent, currentPageText, bottomPlaylistPanel, 
    activated_song, sorted_search_text, activatedPlaylist }) => { 
    const dispatch = useDispatch()
    const [sortText, setSortText] = useState("")
    var sorted_songs = useSelector(SelectSortedSongs(sortText))
    var sorted_albums = useSelector(SelectSortedSongs("Album"))

    const handleSelect = (e) => {
        const text = e.target.innerText;
        setSortText(text)
    }


    useEffect(() => {
        if (sortText){
            dispatch(catalogueHolderStart(sorted_songs))
            dispatch(changeCurrentPageTextStart('SORTED-SEARCH-PAGE'))
            dispatch(sortedSearchTextStart(sortText))
        }
    },[sortText])
    useEffect(() => {
        dispatch(catalogueHolderStart(sorted_albums))
        dispatch(changeCurrentPageTextStart('ALBUM-COLLECTION-PAGE'))
    },[])

    const playlistCard = () => {
        const Card=document.querySelector('.new-playlist-card')
        Card.dataset.name = "RenamePlaylist"
        Card.classList.toggle('show-new-playlist-card')
    }
    
    var sorted_albums = useSelector(SelectSortedSongs("Album"))
    const DeletePlaylist = () => {
        dispatch(deletePlaylistStart(activatedPlaylist))
        dispatch(catalogueHolderStart(sorted_albums))
        dispatch(changeCurrentPageTextStart('ALBUM-COLLECTION-PAGE'))
    }
    return (
            <div className='main-app'>
                
                <FormGroup SideBarType/>
                <div className='head'>
                    {
                        currentPageText==="SEARCH-PAGE"
                        ? <div className='block'><h1>Search Result:</h1></div>
                        : currentPageText==="MY-PLAYLIST"
                        ? <div className='block'>
                            <h1>My Playlist</h1>
                            <button onClick={e => playlistCard()} className='edit-btn'><FontAwesomeIcon icon={faPen}/>RENAME</button>
                            <button onClick={e => DeletePlaylist()} className='edit-btn'><FontAwesomeIcon icon={faTrash}/>DELETE</button>
                        </div>
                        : <div className='block'><h1>My Music</h1></div>
                    }
                    <div className='block'>
                        {
                            currentPageText==="ARTIST-COLLECTION-PAGE" || currentPageText==="SORTED-SEARCH-PAGE"
                            ? <div className='box a'>
                                <span>Sort by : </span>
                                <FormSelect
                                    // selecttype='MidInputType2'
                                    // type="text"
                                    sortText={sortText}
                                    handleSelect={handleSelect}
                                    data={["A to Z", 'Genre', 'Artist', 'Release Year', 'Label']}//, 'A to Z']}
                                    name="sorted_search_text"/>
                            </div>
                            :null
                        }
                        {
                            (currentPageText==='SORTED-SEARCH-PAGE' && sorted_search_text!=="A to Z") || currentPageText==='SONGS-COLLECTION-PAGE' 
                            || currentPageText==="MY-PLAYLIST" || currentPageText==='SEARCH-PAGE'
                            ? <SelectAndCancel />
                            : null
                        }
                    </div>
                </div>
                <div className={`body 
                            ${currentPageText==='ALBUM-COLLECTION-PAGE' ||
                            currentPageText==='SEARCH-PAGE'
                            ? 'body-1 ' : 'body-2 '}
                            ${activated_song && !bottomPlaylistPanel
                            ? 'reduce-height-for-btm-player' 
                            : bottomPlaylistPanel 
                            ? 'increase-padding-for-btm-player' : ''}`
                            }>
                        {
                            currentPageText==='ALBUM-COLLECTION-PAGE'
                            ? <AlbumCollectionsPage />
                            : 
                            currentPageText==='SONGS-COLLECTION-PAGE'
                            ? <SongCollectionsPage />
                            : 
                            currentPageText==='SORTED-SEARCH-PAGE' || currentPageText==='ARTIST-COLLECTION-PAGE' 
                            ? <ArtistCollectionPage catalogueContent={catalogueContent}/>
                            : 
                            currentPageText==='SEARCH-PAGE'
                            ? <SearchPage />
                            : 
                            currentPageText==='NOW-PLAYING-PAGE' 
                            ? <NowPlayingPage />
                            :
                            currentPageText==='MY-PLAYLIST' 
                            ? <PlaylistCollectionPage />
                            :
                            currentPageText==="ARTIST-VIEW-PAGE"
                            ? <ArtistView/>
                            : null
                        }
                </div>

            </div>
    )
 };

const mapStateToProps = createStructuredSelector({
    activated_song: selectActivatedSong,
    display_bottom_player: selectDisplayBottomPlayer,
    sortedSongs: SelectSortedSongs,
    sorted_search_text: selectSortedSearchText,
    catalogueContent: selectCatalogueContent,
    currentPageText: selectCurrentPageText,
    bottomPlaylistPanel: selectAddToPlaylistPanel,
    activatedPlaylist: selectedActivatedPlaylist
})
//  const mapDispatchToProps = (dispatch) => ({
//     clickedSlideImagesStart: (url) => dispatch(fetchClickedSlideImagesStart(url))
//  })
 export default connect(mapStateToProps)(MainApp);

