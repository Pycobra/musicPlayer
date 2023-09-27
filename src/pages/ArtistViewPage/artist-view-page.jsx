import React, { useEffect, useRef, useState } from 'react';
import "./artist-view-page.styles.css"
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CaretNext } from '../../components/asset/caret-next-white.svg';
import CustomButton from '../../components/custom-button/custom-button.component';
import { SelectProfileOfSingleArtists } from '../../redux/profile/profile.selectors';
import { SelectSortedSongs } from '../../redux/songs/songs.selectors';
import { 
    fetchActivatedSongStart, fetchDisplayBottomPlayerStart, 
} from '../../redux/songs/songs.actions';
import { setArtistIdStart } from '../../redux/profile/profile.actions';
import { changeCurrentPageTextStart } from '../../redux/songs/songs.actions';




const ArtistView = ({artist_profile}) => {   
    const dispatch = useDispatch()
    const handleMouseLeave = (e) => {
        const card = document.querySelector('span.artist-view-card')
        return card ? card.remove() : null
    }    
    
    const HandleSongclick = (e, item) => {
        dispatch(fetchActivatedSongStart(item))
        dispatch(fetchDisplayBottomPlayerStart(true))
    }
    const artistViewRef = useRef()
    const handleMousever = (e) => {
        const toolTipElement = document.createElement('span')
        
        toolTipElement.className = 'artist-view-card'
        toolTipElement.textContent = `${
            e.target.classList.contains('btn-txt1') 
            ? 'click to play this song'
            : e.target.classList.contains('btn-txt2')  
            ? 'click to set this song as your callertunes'
            : null
        }`
        
        const hostElPosLeft=e.target.offsetLeft
        const hostElPosTop=e.target.offsetTop
        const hostElHeight=e.target.clientHeight
        const hostElWidth=e.target.clientWidth

        const x = hostElPosLeft + hostElWidth -20
        const y = hostElPosTop - 40
        
        toolTipElement.style.left = x + 'px'
        toolTipElement.style.top = y +'px'
        e.target.insertAdjacentElement('afterend', toolTipElement)
    }


    const other_artists_data = useSelector(SelectSortedSongs("Artist"))
    const [otherArtists, setOtherArtists] = useState([])
    useEffect(() => {
        const data = other_artists_data.filter(i => i[0].artistID !== artist_profile.id)
                        .map(i => {
                            i[0]["no of song"] = i.length
                            return i[0]
                        })
        setOtherArtists(data)
    },[])
    const handleClick = (itm) => {
        dispatch(setArtistIdStart(itm.artistID))
        artistViewRef.current.scrollIntoView({behaviour: "smooth"}) //.scrollTo(0)
    }
    return (
        <section id='artist-view' ref={artistViewRef}>    
            {artist_profile
            ? <div className='artist-view-body'>
                    <div className='block-1'>
                        <span className='box-1 img-holder'> 
                            <img className='img-top' src={require(`../../Media/song-pic/${artist_profile.url[0].url}.PNG`)} />
                        </span>
                        <div className='box-2'>
                            <div className='place-1'>
                                {/* <span className='text-1'>{artist_profile.songs[0].title}</span> */}
                                <span className='text-1'>{artist_profile.name}</span>
                                <span className='text-2'>{artist_profile.name}{' '}{artist_profile.songs[0].title}</span>
                                <span className='text-3'>{artist_profile.songs[0].minutes}{' '}{artist_profile.songs[0].release_year}{' '}{artist_profile.songs[0].label} record</span>
                                <div className='btns'>
                                    <CustomButton style={{backgroundColor:'red',border:'none'}} buttonType="borderType">
                                        <CaretNext /><span onMouseLeave={e => handleMouseLeave(e)} onMouseOver={e => handleMousever(e)} className='btn-txt btn-txt1'>Play&nbsp;Now</span>
                                    </CustomButton>
                                    <CustomButton buttonType="borderType"><span style={{color:'var(--darkgrey)',zIndex: '1'}} className='html-icon'>&#9835;</span>
                                    <span onMouseLeave={e => handleMouseLeave(e)} 
                                        onMouseOver={e => handleMousever(e)} style={{color:'var(--darkgrey)',zIndex: '1'}} 
                                        className='btn-txt  btn-txt2'>Set&nbsp;Free&nbsp;Hellotunes</span></CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='block-2'>
                        <div className='box-2'>
                            <div className='place-1'>   
                                <h2>All {artist_profile.name} Songs </h2>
                                {artist_profile.songs.map((itm, idx) =>
                                    <div key={idx} className='place-1-box'>
                                        <div className='place1'>
                                            <img className='img-top' src={require(`../../Media/song-pic/${itm.url}.PNG`)} />
                                            <div className='txt'>
                                                <span>{itm.title}</span>
                                                <span>{artist_profile.name}</span>
                                            </div>
                                        </div>
                                        <CustomButton HandleClick={e => HandleSongclick(e, itm)} buttonType="circleType"><span>&#10140;</span></CustomButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='block-3'>
                        <h2>Other Artists</h2>
                        <div className='place-1'>
                            {
                            otherArtists.map((itm, idx) => (
                                <div key={idx} className='box' onClick={e => handleClick(itm)}>
                                    <img className='img-top' src={require(`../../Media/song-pic/${itm.url}.PNG`)} />
                                    <div className='txt'>
                                        <span>{itm.name}</span>
                                        <span>{itm["no of song"]} Songs</span>
                                        {/* <span>{artist_profile.name} - {artist_profile.songs[0].title.slice(0,7)}...</span> */}
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className='block-4'>
                        <div className="table">
                            <h1>About - {artist_profile.songs[0].title}</h1>
                            <div className="tbody">
                                
                                <div className='cols'><span>Album/ Movie</span><span>Kenny rogers a love song collection</span></div>
                                <div className='cols'><span>Singers</span><span>Kenny Rogers</span></div>
                                <div className='cols'><span>Actors</span><span>Kenny Rogers</span></div>
                                <div className='cols'><span>Music Composer</span><span>Jimmy Funk</span></div>
                                <div className='cols'><span>Music Director</span><span>Kenny Rogers</span></div>
                                <div className='cols'><span>Lyricist</span><span>Kenny Rogers</span></div>
                                <div className='cols'><span>Other</span><span>Kenny Rogers</span></div>
                                <div className='cols'><span>Language</span><span>English</span></div>
                                <div className='cols'><span>Music Company</span><span>1999 Koch Record</span></div>
                                <div className='cols'><span>Duration</span><span>03:44</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            : null}
        </section>
    )
 };

const mapStateToProps = createStructuredSelector({
    artist_profile: SelectProfileOfSingleArtists,
})
//  const mapDispatchToProps = (dispatch) => ({
//     clickedSlideImagesStart: (url) => dispatch(fetchClickedSlideImagesStart(url))
//  })
//  export default ArtistView;
 export default connect(mapStateToProps)(ArtistView);
