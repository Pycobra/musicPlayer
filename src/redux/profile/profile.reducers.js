import {ProfilesData} from "./profile-data.js";
import { ProfilesActionTypes } from './profile.types';


const INITIAL_STATE = {
    profiles: ProfilesData,
    isFetching: false,
    artistID:null,
}

const ProfilesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ProfilesActionTypes.FETCH_ALL_PHOTO_START:
            return{
                ...state,
                isFetching: true,
            }
        case ProfilesActionTypes.FETCH_ALL_ARTIST_SUCCESS:
            return{
                ...state,
                isFetching: false,
                profiles: action.payload,
            }
        case ProfilesActionTypes.FETCH_ALL_ARTIST_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload,
                files: action.payload,
            }
        case ProfilesActionTypes.SET_ARTIST_ID:
            return{
                ...state,
                isFetching: false,
                artistID: action.payload,
            }
        default:
            return state
    }
}
 
export default ProfilesReducer;





