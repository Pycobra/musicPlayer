import { ProfilesActionTypes } from "./profile.types"

export const fetchAllArtistStart = (className) => ({
    type: ProfilesActionTypes.FETCH_ALL_ARTIST_START,
    payload: className
})
export const fetchAllArtistSuccess = (className) => ({
    type: ProfilesActionTypes.FETCH_ALL_ARTIST_SUCCESS,
    payload: className
})
export const fetchAllArtistFailure = (className) => ({
    type: ProfilesActionTypes.FETCH_ALL_ARTIST_FAILURE,
    payload: className
})
export const setArtistIdStart = (id) => ({
    type: ProfilesActionTypes.SET_ARTIST_ID,
    payload: id
})

