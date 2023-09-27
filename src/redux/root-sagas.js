import { call, all } from "redux-saga/effects"
import { songsSagas } from "./songs/songs.sagas"
import { profilesSagas } from "./profile/profile.sagas"


export default function* rootSaga(){
    yield all([
        call(songsSagas), 
        call(profilesSagas), 
    ])
}
