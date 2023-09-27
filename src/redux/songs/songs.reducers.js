import {SongsData} from "./songs-data.js";
import { SongsActionTypes } from './songs.types';
import { ExtractAllSongs } from "./songs.utils.js";


const INITIAL_STATE = {
    songs: SongsData,
    all_songs: ExtractAllSongs(SongsData), 
    activatedSong: null,
    selectedSongs: [],
    isFetching: false,
    displayBottomPlayer: false,
    addToPlaylistPanel: false,
    playOrPause:false,
    successMsg: null,
    MY_PLAYLIST:[],
    selectAndCancel:[{name:"Select", active:false},{name:"Select", active:false}],
    ACTIVATED_PLAYLIST: null,
    catalogueHolder: [],
    sortedSearchText: "",
    currentPageText: '',
}

const SongsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SongsActionTypes.FETCH_ALL_SONG_START:
            return{
                ...state,
                isFetching: true,
            }
        case SongsActionTypes.FETCH_ALL_SONG_SUCCESS:
            return{
                ...state,
                isFetching: false,
                songs: action.payload,
            }
        case SongsActionTypes.ACTIVATED_SONG_START:
            return{
                ...state,
                activatedSong: action.payload,
            }
        case SongsActionTypes.DISPLAY_BOTTOM_PLAYER:
            return{
                ...state,
                displayBottomPlayer: action.payload,
            }
        case SongsActionTypes.CHANGE_CURRENT_PAGE_TEXT:
            return{
                ...state,
                currentPageText: action.payload,
            }
        case SongsActionTypes.SORTED_SEARCH_TEXT_START:
            return{
                ...state,
                sortedSearchText: action.payload,
            }
        case SongsActionTypes.CATALOGUE_HOLDER_START:
            return{
                ...state,
                catalogueHolder: action.payload,
            }
        case SongsActionTypes.FETCH_ALL_SONG_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
            }
        case SongsActionTypes.ACTIVATED_PLAYLIST_START:
            return{
                ...state,
                isFetching: false,
                ACTIVATED_PLAYLIST: action.payload,
            }
        case SongsActionTypes.ACTIVATED_PLAY_OR_PAUSE:
            return{
                ...state,
                isFetching: false,
                playOrPause: action.payload ? action.payload : !state.playOrPause,
            }
        case SongsActionTypes.PUSH_TO_SELECTED_SONGS:
            return{
                ...state,
                isFetching: false,
                selectedSongs: action.payload
            }
        case SongsActionTypes.DISPLAY_ADD_TO_PLAYLIST_PANEL:
            return{
                ...state,
                isFetching: false,
                addToPlaylistPanel: action.payload,
            }
        case SongsActionTypes.POST_SONG_TO_PLAYLIST_START:
        case SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_START:
        case SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_START:
        case SongsActionTypes.CREATE_PLAYLIST_START:
        case SongsActionTypes.DELETE_PLAYLIST_START:
            return{
                ...state,
                isFetching: true,
                successMsg: null,
            }
        case SongsActionTypes.POST_SONG_TO_PLAYLIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                successMsg: action.payload.successMsg,
                MY_PLAYLIST: action.payload.data,
            }
        case SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                MY_PLAYLIST: action.payload,
            }
        case SongsActionTypes.CREATE_PLAYLIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                successMsg: action.payload.successMsg,
                MY_PLAYLIST: action.payload.data,
            }
        case SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                successMsg: action.payload.successMsg,
                MY_PLAYLIST: action.payload.data,
            }
        case SongsActionTypes.DELETE_PLAYLIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                ACTIVATED_PLAYLIST: null,
                successMsg: action.payload.successMsg,
                MY_PLAYLIST: action.payload.data,
            }
        case SongsActionTypes.POST_SONG_TO_PLAYLIST_FAILURE:
        case SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_FAILURE:
        case SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_FAILURE:
        case SongsActionTypes.CREATE_PLAYLIST_FAILURE:
        case SongsActionTypes.DELETE_PLAYLIST_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMsg: action.payload,
            }
        default:
            return state
    }
}
 
export default SongsReducer;





