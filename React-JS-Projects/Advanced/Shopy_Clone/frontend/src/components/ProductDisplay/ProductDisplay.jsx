import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const {addToCart}=useContext(ShopContext);
  return (

    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={props.image} alt="" />
                <img src={props.image} alt="" />
                <img src={props.image} alt="" />
                <img src={props.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={props.image} alt="" />
            </div>

        </div>
        <div className="productdisplay-right">
            <h1>{props.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    ${props.old_price}
                </div>
                <div className="productdisplay-right-price-new">
                    ${props.new_price}
                </div>
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure labore similique et id ducimus porro modi consequatur officia inventore. Itaque voluptates quaerat libero nemo incidunt nihil dolore vel iusto!
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>

            </div>
            <button  onClick={()=>{addToCart(props.id)}}   >ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category:</span> Women ,T-shirt ,Crop-top </p>
            <p className='productdisplay-right-category'><span>Tags: </span>Modern ,Latest </p>
        </div>

    </div>
  )
}

export default ProductDisplay