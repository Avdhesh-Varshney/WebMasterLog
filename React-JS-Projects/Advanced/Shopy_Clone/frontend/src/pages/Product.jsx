import React from 'react'
import { useContext } from 'react'

import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import { Description } from '../components/Descriptionbox/Description';
import Relatedproducts from '../components/Relatedproducts/Relatedproducts';
import { ShopContext } from '../context/ShopContext';


const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}= useParams();
  const parts = productId.split(":");
   const productnum = Number(parts[1]);
  
  
  const products = (productId) => {
    return all_product.find(({ id }) => id === productId);
  };
  const selectedProduct = products(productnum); 

/*if (selectedProduct) {
  console.log(selectedProduct);
}*/


  

  return (
    <div>
     <Breadcrumb category={selectedProduct.category} name={selectedProduct.name}/>
     <ProductDisplay id={selectedProduct.id} category={selectedProduct.category} name={selectedProduct.name} image={selectedProduct.image} new_price={selectedProduct.new_price} old_price={selectedProduct.old_price}/>
    
    <Description />
    <Relatedproducts/>
    
    
    </div>
  )
}

export default Product