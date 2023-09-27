import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import "./album-collections-page.style.css"
import { selectCatalogueContent } from '../../redux/songs/songs.selectors';
import Items from '../../components/items/items.component';



const AlbumCollectionPage = ({catalogueContent, HandleImageCheckBox}) => {
    const content = catalogueContent.map(list => ({...list[0], tracks:list.map(i => i.id)}))
    
    return (
            <div className="album-collection list-block">
                <div className='album-c__wrap'>
                    <div className='album-c__item list-block'>
                    {
                    content.map((obj, idx) => (
                        <Items  
                            position={idx}
                            key={idx} obj={obj} 
                            handleImageCheckBox={HandleImageCheckBox}/>
                    ))
                    }
                    </div>
                </div>
            </div>
    )
};
const mapStateToProps = createStructuredSelector({
    catalogueContent: selectCatalogueContent,
})
 export default connect(mapStateToProps)(AlbumCollectionPage);
