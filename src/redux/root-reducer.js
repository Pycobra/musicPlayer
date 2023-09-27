import {combineReducers} from "redux"
import SongsReducer from "./songs/songs.reducers"
import profilesReducer from "./profile/profile.reducers"
// import { persistReducer } from "redux-persist"
// import storage from "redux-persist/lib/storage"


const rootReducer = combineReducers({
    song: SongsReducer,
    profiles: profilesReducer,
})


export default rootReducer;






