import { take, takeEvery, takeLatest, all, call, put } from "redux-saga/effects"
import { ProfilesActionTypes } from "./profile.types"
import {  
    fetchAllArtistSuccess,
    fetchAllArtistFailure,
} from "./profile.actions"



export function* getAllArtistStart({payload}) {
    console.log(payload)
    try{
        yield put(fetchAllArtistSuccess(payload))
    } catch (error){
        yield put(fetchAllArtistFailure(error.message))
    }
}
export function* onFetchAllArtistStart() {
    yield takeLatest(ProfilesActionTypes.FETCH_ALL_ARTIST_START, 
        getAllArtistStart)
}
export function* profilesSagas(){
    yield all([ 
        call(onFetchAllArtistStart),
    ])
}


