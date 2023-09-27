import { createSelector } from "reselect";
import { selectAllSongs } from "../songs/songs.selectors";

const selectProfile = state => state.profiles
const selectSongsFromProfile = state => state.song

export const SelectAllProfiles = createSelector(
    [selectProfile],
    (profile) => Object.values(profile.profiles)
)
export const ProfileAllArtists = createSelector(
    [SelectAllProfiles, selectSongsFromProfile],
    (profile, song) => {
        const alphabet = Array.from(new Set(profile.map(pro => pro.name[0]).sort()))
        const artistProfile = alphabet.map(letter => profile.map(pro => {
                return pro.name[0] === letter
                ? {
                    id: pro.id,
                    name: pro.name, 
                    songs: Object.values(song.songs).find(sng => sng.artistID === pro.id)
                            .songs,
                    url: Object.values(song.songs).find(sng => sng.artistID === pro.id)
                            .songs[0].url
                        }
                    
                : null }).filter(obj => obj))
        return [...new Set(artistProfile)]
    }
)
export const SelectArtistID = createSelector(
    [selectProfile],
    (profile) => profile.artistID
)
export const SelectProfileOfSingleArtists = createSelector(
    [SelectAllProfiles, selectSongsFromProfile, SelectArtistID],
    (profile, song, artistObj) => {
        const artistProfile = profile.map(pro => {
                return pro.id === parseInt(artistObj)
                ? {
                    id: pro.id,
                    name: pro.name, 
                    clickedUserSong: Object.values(song.songs).find(sng => sng.artistID === pro.id)
                            .songs.find(itm => itm.artistID=== parseInt(artistObj)),
                    songs: Object.values(song.songs).find(sng => sng.artistID === pro.id)
                            .songs,
                    url: Object.values(song.songs).find(sng => sng.artistID === pro.id)
                            .songs
                    }
                    
                : null }).find(obj => obj)
        return artistProfile


    }
)