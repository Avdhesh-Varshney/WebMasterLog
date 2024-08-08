import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import destinationsData from '../../destinations-data';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';
import '../../App.scss';
import Loader from '../Loader';
// specifying our image path.
const imagePath = process.env.PUBLIC_URL + '/images/';


// a functional sub component that create various types of buttons.
const TagButton = ({name, handleSetTag, tagActive})=>{

    return(
        <button className={`tag ${tagActive ? 'active': null}`} onClick={()=>handleSetTag(name)}>
            {name.toUpperCase()}
        </button>
    );

}
const options = {
	// settings: {
	// 	overlayColor: 'rgb(25, 136, 124)',
	// 	autoplaySpeed: 1500,
	// 	transitionSpeed: 900
	// },
	// buttons: {
	// 	backgroundColor: 'red',
	// 	iconColor: 'rgba(126, 172, 139, 0.8)'
	// },
	// caption: {
	// 	captionColor: '#a6cfa5',
	// 	captionFontFamily: 'Raleway, sans-serif',
	// 	captionFontWeight: '300',
	// 	captionTextTransform: 'uppercase'
	// },
	// progressBar: {
	// 	height: '20px',
	// 	fillColor: 'blue',
	// 	backgroundColor: 'white'
	// }
};
function Destinations() {
    const [tag, setTag] = useState('all');
    const [filteredImages, setFilteredImages] = useState([]);
    // for loader to open or close
    const [open, setOpen] = useState(true);
	useEffect(
		() => {
			// image filtering is done.
			tag === 'all' ? setFilteredImages(destinationsData) : setFilteredImages(destinationsData.filter(image => image.tag === tag));
		},
		[tag]
	);
    // following useState is for loader 
    useEffect(()=>{
        setInterval(() => {
            if (document.readyState === 'complete') {
                setOpen(false);
            }
          }, 100);
    },[])

    return (
        <div className="destinations">
			{open===true ? <Loader open/>: <Loader />}
            <div className="tags">
                <TagButton name="all" tagActive={tag === 'all' ? true : false} handleSetTag={setTag} />
                <TagButton name="popular" tagActive={tag === 'popular' ? true : false} handleSetTag={setTag} />
                <TagButton name="new" tagActive={tag === 'new' ? true : false} handleSetTag={setTag} />
                <TagButton name="romantic" tagActive={tag === 'romantic' ? true : false} handleSetTag={setTag} />
            </div>
			<SimpleReactLightbox>
			<SRLWrapper options={options} key="unique-value">
				<div className="container">
					{filteredImages.map((image)=>{
						return(
							<div key={image.id} className="image-card">
								<Link to={`${imagePath}${image.imageName}`}>
									<img className="image" src={`${imagePath}${image.imageName}`} alt="" />
								</Link>
								{}
							</div>
						)
					})}
				</div>
            </SRLWrapper>
			</SimpleReactLightbox>
        </div>
    )
}

export default Destinations
