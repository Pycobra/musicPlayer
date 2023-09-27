import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import { SongsActionTypes } from "./songs.types"
import {  
    fetchAllSongSuccess,
    fetchAllSongFailure,
    createPlaylistSuccess,
    createPlaylistFailure,
    postSongToPlaylistSuccess,
    postSongToPlaylistFailure,
    fetchSongFromPlaylistSuccess,
    fetchSongFromPlaylistFailure,
    removeSongFromPlaylistSuccess,
    removeSongFromPlaylistFailure,
    deletePlaylistSuccess,
    deletePlaylistFailure,
} from "./songs.actions"
import axios from 'axios';


class CustomError extends Error{
    constructor(msg){
        super();
        this.name = "";
        this.message= msg;
    }
}
export function* getAllSongStart({payload}) {
    console.log(payload)
    try{
        yield put(fetchAllSongSuccess(payload))
    } catch (error){
        yield put(fetchAllSongFailure(error.message))
    }
}
const createPlaylistID = () => {
    const characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const min = 7
    const max = 9
    const num = (Math.random() * (max - min + 1)) + min
    const characterLength = characters.length;
    var PlaylistID = ""
    for (let i=0; i<num; i++){
      PlaylistID += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return PlaylistID
  }
export function* createMyPlayist({payload}) {
    const {playlistName, activatedPlaylist, action}= payload
    console.log(action)
    try{
        const id = createPlaylistID()
        var obj ={[id]:{name:playlistName, playlist:[]}}
        const MY_PLAYLIST = localStorage.getItem('my playlist')
        if (MY_PLAYLIST) {
            const playlist_obj = JSON.parse(MY_PLAYLIST)
            if (action==="AddPlaylist"){
                const exists = playlist_obj.find(i => i[Object.keys(i)[0]].name===playlistName)
                if (exists) throw new CustomError("Playlist already exists")
                else if (!exists && action==="AddPlaylist"){
                    playlist_obj.push(obj)
                    localStorage.setItem('my playlist', JSON.stringify(playlist_obj));
                }
            }
            else if (action==="RenamePlaylist"){
                const new_playlist =playlist_obj.map(i => {
                    if (Object.keys(i)[0]===activatedPlaylist) {
                        i[Object.keys(i)[0]].name=playlistName
                        return i}
                    return i
                })
                localStorage.setItem('my playlist', JSON.stringify(new_playlist));
            }
        } else localStorage.setItem('my playlist', JSON.stringify([obj]));
        yield put(createPlaylistSuccess({
            data:JSON.parse(localStorage.getItem('my playlist')),
            successMsg: `playlist successfully ${
                action==="RenamePlaylist" ? "renamed" : "created" }`
        }))
    } catch (error){
        yield put(createPlaylistFailure(error.message))
    }
}

export function* removeSongFromPlayist({payload}) {
    const {id, value} = payload
    try{
        const MY_PLAYLIST = localStorage.getItem('my playlist')
        const playlist_obj = JSON.parse(MY_PLAYLIST)
        const PLAY_LIST = playlist_obj.find(obj => Object.keys(obj)[0]===id)
        if (Object.keys(PLAY_LIST).length){
            var {playlist, name} = PLAY_LIST[id]
            var playlist = playlist.filter(i => !value.includes(i))
            const NEW_DATA = {[id]:{name, playlist}}
            const new_playlist = playlist_obj.map(obj => Object.keys(obj)[0]!==id ? obj : NEW_DATA)
            localStorage.setItem('my playlist', JSON.stringify(new_playlist));
            yield put(removeSongFromPlaylistSuccess({
                data:JSON.parse(localStorage.getItem('my playlist')),
                successMsg: `${value.length} songs successfully removed`
            }))
        }
        else if (!PLAY_LIST) throw new CustomError("this playlist does not exist") 
    } catch (error){
        yield put(removeSongFromPlaylistFailure(error.message))
    }
}
export function* deletePlaylistStart({payload}) {
    try{
        const MY_PLAYLIST = localStorage.getItem('my playlist')
        const playlist_obj = JSON.parse(MY_PLAYLIST)
        const NEW_PLAYLIST = playlist_obj.filter(obj => Object.keys(obj)[0]!==payload)
        const DELETED_PLAYLIST = playlist_obj.find(obj => Object.keys(obj)[0]===payload)
        localStorage.setItem('my playlist', JSON.stringify(NEW_PLAYLIST));
        yield put(deletePlaylistSuccess({
            data:JSON.parse(localStorage.getItem('my playlist')),
            successMsg: `${DELETED_PLAYLIST[Object.keys(DELETED_PLAYLIST)[0]].name} successfully deleted`
        }))
    } catch (error){
        yield put(deletePlaylistFailure(error.message))
    }
}
export function* getSongFromPlayist({payload}) {
    try{
        const MY_PLAYLIST = localStorage.getItem('my playlist')
        if (MY_PLAYLIST) {
            const playlist_obj = JSON.parse(MY_PLAYLIST)
            yield put(fetchSongFromPlaylistSuccess(playlist_obj))
        }
        if (!MY_PLAYLIST) throw new CustomError("No playlist data")  
    } catch (error){
        yield put(fetchSongFromPlaylistFailure(error.message))
    }
}
export function* postSongToPlayist({payload}) {
    const {id, value} = payload
    console.log(id, value)
    try{
        const MY_PLAYLIST = localStorage.getItem('my playlist')
        const playlist_obj = JSON.parse(MY_PLAYLIST)
        const PLAY_LIST = playlist_obj.find(obj => obj[id])
        console.log(PLAY_LIST, id, PLAY_LIST[id])
        if (PLAY_LIST){
            var {playlist, name} = PLAY_LIST[id]
            console.log(playlist, name)
            PLAY_LIST[id].playlist = [...new Set([...playlist, ...value])]
            // const NEW_DATA = {[payload.id]:{name, playlist}}
            // const s = playlist_obj.push({[id]:{name, playlist:[...playlist, ...value]}})
            localStorage.setItem('my playlist', JSON.stringify(playlist_obj));
            yield put(postSongToPlaylistSuccess({
                data:JSON.parse(localStorage.getItem('my playlist')),
                successMsg: `${value.length} songs successfully added`
            }))
        }
        else if (!PLAY_LIST) throw new CustomError("this playlist does not exist")  
    } catch (error){
        yield put(postSongToPlaylistFailure(error.message))
    }
}





export function* onFetchAllSongStart() {
    yield takeLatest(SongsActionTypes.FETCH_ALL_SONG_START, 
        getAllSongStart)
}
export function* onCreatePlayistStart() {
    yield takeLatest(SongsActionTypes.CREATE_PLAYLIST_START, 
        createMyPlayist)
}
export function* onFetchSongFromPlayistStart() {
    yield takeLatest(SongsActionTypes.FETCH_SONG_FROM_PLAYLIST_START, 
        getSongFromPlayist)
}
export function* onPostSongToPlayistStart() {
    yield takeLatest(SongsActionTypes.POST_SONG_TO_PLAYLIST_START, 
        postSongToPlayist)
}
export function* onRemoveSongFromPlayistStart() {
    yield takeLatest(SongsActionTypes.REMOVE_SONG_FROM_PLAYLIST_START, 
        removeSongFromPlayist)
}
export function* onDeletePlaylistStart() {
    yield takeLatest(SongsActionTypes.DELETE_PLAYLIST_START, 
        deletePlaylistStart)
}
export function* songsSagas(){
    yield all([ 
        call(onFetchAllSongStart),
        call(onCreatePlayistStart),
        call(onFetchSongFromPlayistStart),
        call(onPostSongToPlayistStart),
        call(onRemoveSongFromPlayistStart),
        call(onDeletePlaylistStart),
    ])
}


