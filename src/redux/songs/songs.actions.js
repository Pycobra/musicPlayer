import { SongsActionTypes } from "./songs.types"

export const fetchAllSongStart = (className) => ({
    type: SongsActionTypes.FETCH_ALL_SONG_START,
    payload: className
})
export const fetchAllSongSuccess = (className) => ({
    type: SongsActionTypes.FETCH_ALL_SONG_SUCCESS,
    payload: className
})
export const fetchAllSongFailure = (className) => ({
    type: SongsActionTypes.FETCH_ALL_SONG_FAILURE,
    payload: className
})
export const fetchActivatedSongStart = (obj) => ({
    type: SongsActionTypes.ACTIVATED_SONG_START,
    payload: obj
})
export const fetchDisplayBottomPlayerStart = (bool) => ({
    type: SongsActionTypes.DISPLAY_BOTTOM_PLAYER,
    payload: bool
})
export const changeCurrentPageTextStart = (page) => ({
    type: SongsActionTypes.CHANGE_CURRENT_PAGE_TEXT,
    payload: page
})

export const catalogueHolderStart = (obj) => ({
    type: SongsActionTypes.CATALOGUE_HOLDER_START,
    payload: obj
})
export const sortedSearchTextStart = (obj) => ({
    type: SongsActionTypes.SORTED_SEARCH_TEXT_START,
    payload: obj
})
export const pushSelectedSongs = (obj) => ({
    type: SongsActionTypes.PUSH_TO_SELECTED_SONGS,
    payload: obj
})
export const changeAddToPlaylistPanel = (bool) => ({
    type: SongsActionTypes.DISPLAY_ADD_TO_PLAYLIST_PANEL,
    payload: bool
})
export const activatePlayOrPause = (bool) => ({
    type: SongsActionTypes.ACTIVATED_PLAY_OR_PAUSE,
    payload: bool
})



export const createPlaylistStart = (id) => ({
    type: SongsActionTypes.CREATE_PLAYLIST_START,
    payload: id
})
export const createPlaylistSuccess = (obj) => ({
    type: SongsActionTypes.CREATE_PLAYLIST_SUCCESS,
    payload: obj
})
export const createPlaylistFailure = (errMsg) => ({
    type: SongsActionTypes.CREATE_PLAYLIST_FAILURE,
    payload: errMsg
})
export const postSongToPlaylistStart = (id) => ({
    type: SongsActionTypes.POST_SONG_TO_PLAYLIST_START,
    payload: id
})
export const postSongToPlaylistSuccess = (obj) => ({
    type: SongsActionTypes.POST_SONG_TO_PLAYLIST_SUCCESS,
    payload: obj
})
export const postSongToPlaylistFailure = (errMsg) => ({
    type: SongsActionTypes.POST_SONG_TO_PLAYLIST_FAILURE,
    payload: errMsg
})

export const fetchSongFromPlaylistStart = () => ({
    type: SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_START
})
export const fetchSongFromPlaylistSuccess = (obj) => ({
    type: SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_SUCCESS,
    payload: obj
})
export const fetchSongFromPlaylistFailure = (errMsg) => ({
    type: SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_FAILURE,
    payload: errMsg
})

export const removeSongFromPlaylistStart = (id) => ({
    type: SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_START,
    payload: id
})
export const removeSongFromPlaylistSuccess = (obj) => ({
    type: SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
    payload: obj
})
export const removeSongFromPlaylistFailure = (errMsg) => ({
    type: SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_FAILURE,
    payload: errMsg
})

export const deletePlaylistStart = (id) => ({
    type: SongsActionTypes.DELETE_PLAYLIST_START,
    payload: id
})
export const deletePlaylistSuccess = (obj) => ({
    type: SongsActionTypes.DELETE_PLAYLIST_SUCCESS,
    payload: obj
})
export const deletePlaylistFailure = (errMsg) => ({
    type: SongsActionTypes.DELETE_PLAYLIST_FAILURE,
    payload: errMsg
})

export const activatedPlaylistStart = (id) => ({
    type: SongsActionTypes.ACTIVATED_PLAYLIST_START,
    payload: id
})