import { createSelector } from "reselect";
import { SelectAllProfiles, ProfileAllArtists } from "../profile/profile.selectors";

const selectSongs = state => state.song
// const selectProfile = state => state.profiles

export const selectAllSongs = createSelector(
    [selectSongs],
    (song) => Object.values(song.songs)
)
export const selectDisplayBottomPlayer = createSelector(
    [selectSongs],
    (song) => song.displayBottomPlayer
)
export const selectAddToPlaylistPanel = createSelector(
    [selectSongs],
    (song) => song.addToPlaylistPanel
)
export const selectActivatedSong = createSelector(
    [selectSongs],
    (song) => song.activatedSong
)
export const selectCurrentPageText = createSelector(
    [selectSongs],
    (song) => song.currentPageText
)
export const selectCatalogueContent = createSelector(
    [selectSongs],
    (song) => song.catalogueHolder
)
export const selectSortedSearchText = createSelector(
    [selectSongs],
    (song) => song.sortedSearchText
)
export const selectedSongsList = createSelector(
    [selectSongs],
    (song) => song.selectedSongs
)
export const selectedMyPlaylist = createSelector(
    [selectSongs],
    (song) => song.MY_PLAYLIST
)
export const selectedActivatedPlaylist = createSelector(
    [selectSongs],
    (song) => song.ACTIVATED_PLAYLIST
)
export const selectSuccessMsg = createSelector(
    [selectSongs],
    (song) => song.successMsg
)
export const selectPlayOrPause = createSelector(
    [selectSongs],
    (song) => song.playOrPause
)
export const selectAllMySongs = createSelector(
    [selectSongs],
    (song) => song.all_songs
)
export const selectSearch = (searchWord) => createSelector(
    [selectAllMySongs],
    (all_songs) => all_songs.filter(song => { 
        const title = song.title.toLowerCase()
        const name = song.name.toLowerCase()
        const label = song.label.toLowerCase()
        const album = song.album.toLowerCase()
        const searchWord2 = searchWord.toLowerCase()
        return searchWord 
            ? (
                title.includes(searchWord2) ? song
                : name.includes(searchWord2) ? song
                : label.includes(searchWord2) ? song
                : album.includes(searchWord2) ? song
                : null
                )
            : null
        })
)
export const selectSinglePlaylist = (id) => createSelector(
    [selectedMyPlaylist, selectAllMySongs, SelectAllProfiles],
    (my_playlist, all_songs, profile) => {
        if (id) {
            const data = my_playlist.find(i => i[id])[id]
            const playlist = []
            all_songs.map(song => 
                data.playlist.includes(song.id) ? playlist.push(song) : null
            )
            return {[id]: {name:data.name, playlist}}
         } 
    }
)

export const selectAlbumSongs = (idList) => createSelector(
    [selectAllMySongs],
    (all_song) => {
        if (idList){
            return all_song.filter(song => {
                const found = idList.find(i => i===song.id)
                if (found) return song    
            })
        }
        return []
        
    }
)



export const SelectSortedSongs = (selected) => createSelector(
    [selectAllMySongs, ProfileAllArtists],
    (allSongs, A2Z) => {
        const Genre = []
        const Artist = []
        const Label = []
        const ReleaseYear = []
        const Album = []
        allSongs.map(itm => {
            Genre.push(itm.genre)
            Artist.push(itm.name)
            Label.push(itm.label)
            ReleaseYear.push(itm.release_year)
            Album.push(itm.album)
        })
        var uniqueGenre =[...new Set(Genre)]
        var uniqueArtist =[...new Set(Artist)]
        var uniqueReleaseYear =[...new Set(ReleaseYear)]
        var uniqueLabel =[...new Set(Label)]
        var uniqueAlbum =[...new Set(Album)]
        var list = []
        if (selected === 'Genre'){
            return uniqueGenre.map(unique => ( 
                allSongs.filter(itm => itm.genre === unique)
            ))
        }
        else if (selected === 'Artist'){
            return uniqueArtist.map(unique => ( 
                allSongs.filter(itm => itm.name === unique)
            ))
        }
        else if (selected === 'Album'){
            return uniqueAlbum.map(unique => ( 
                allSongs.filter(itm => itm.album === unique)
            ))
        }
        else if (selected === 'A to Z'){
            return A2Z
        }
        else if (selected === 'Release Year'){
            return uniqueReleaseYear.map(unique => ( 
                allSongs.filter(itm => itm.release_year === unique)
            ))
        }
        else if (selected === 'Label'){
            return uniqueLabel.map(unique => ( 
                allSongs.filter(itm => itm.label === unique)
            ))
        }
    }
)


// export const SelectSingleSong = createSelector(
//     [selectAllSongs, SelectAllProfiles],
//     (song, profile) => {
//         const myList = []
//         const myProfile = []
//         var cnt = 0
//          song.reduce((li, currentSong, index) => {
//                 profile.map(acc => {
//                     if (acc.id === currentSong.artistID){
//                         currentSong.songs.map(itm => {
//                             itm['selected'] = false
//                             itm['id'] = currentSong.id
//                             itm['artistID'] = currentSong.artistID
//                             itm['name'] = acc.name
//                             li.push(itm)
//                         })
//                     }
//                 })
//                 return li
//             }, myList)
//         return myList
//     }
// )


