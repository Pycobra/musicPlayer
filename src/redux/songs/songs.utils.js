import { ProfilesData as profile } from "../profile/profile-data.js";



export const ExtractAllSongs = (song) => {
        const myList = []
        Object.values(song).reduce((list, currentSong, index) => {
            Object.values(profile).map(acc => {
                    if (acc.id === currentSong.artistID){
                        currentSong.songs.map(itm => {
                            itm['selected'] = false
                            itm['artistID'] = currentSong.artistID
                            itm['name'] = acc.name
                            list.push(itm)
                        })
                    }
                })
                return list
            }, myList
        )
        return myList
    }

