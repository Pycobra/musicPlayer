import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import "./now-playing-page.styles.css"
import CheckboxInput from '../../components/musicPlayerItems/checkbox-input/checkbox-input.component';
import { ReactComponent as CaretNextWhite } from '../../components/asset/caret-next-white.svg';
import { selectActivatedSong } from '../../redux/songs/songs.selectors';




const NowPlayingPage = ({activated_song, handleImageCheckBox}) => {
    var [id, title, label, url] = ""
    if (activated_song){
        var {id, name, title, label, url} = activated_song
    }
    return (
            activated_song
            ? <section id="now-playing">
                <div className='now-playing-wrap'>
                    <span className='img-holder'> 
                        <img src={require(`../../Media/song-pic/${url}.PNG`)} />
                        <div className='img-txt'>
                            <span className='song'>{`${title + ' || ' + label}`}</span>
                            <span className='name'>{name}</span>
                        </div>
                        <div className='img-icon'>
                            <span className='html-icon'>&#10022;</span>
                            <span className='html-icon'>&#10138;</span>
                        </div>
                    </span>
                    <span data-id={id} 
                            data-obj={activated_song}
                            className='song-li'>
                            <div className='song-li-wrap'>
                                <div className='item-1'>
                                    <div className='place-1'>
                                        <CheckboxInput 
                                            data={id}
                                            inputType='CHECKBOX2'
                                            handleChange={(e) => handleImageCheckBox(e, id)}
                                            name={`imageSelected${id}`}/>
                                        <div className="hide-div1">{title.slice(0,15) + '...'}</div>
                                        <div>
                                            <span>{title.length > 15 ? title.slice(0,15) + '...' : title}</span>
                                            <span className='double-bar'>||</span>
                                            <span>{label.length > 15 ? label.slice(0,15) + '...' : label} Record</span>
                                        </div>
                                    </div>
                                    <div className='place-2'><span><CaretNextWhite /></span><span className="html-icon">&#10011;</span></div>
                                </div>
                                <span className='item-2'>{name.length > 15 ? name.slice(0,15) + '...' : name}</span>
                            </div>
                    </span>
                </div>
            </section>
            : <section id="now-playing">
                <div className='now-playing-wrap'>
                      <span className='img-holder2'>
                          <img src={require(`../../Media/song-pic/song9.PNG`)} />
                          <div className='img-txt'>
                              <span className='name'>You Have Not Chosen A Song</span>
                          </div>
                      </span>
                  </div>
            </section>
)};
const mapStateToProps = createStructuredSelector({
    activated_song: selectActivatedSong,
})
//  const mapDispatchToProps = (dispatch) => ({
//     clickedSlideImagesStart: (url) => dispatch(fetchClickedSlideImagesStart(url))
//  })
//  export default Homepage;
 export default connect(mapStateToProps)(NowPlayingPage);
