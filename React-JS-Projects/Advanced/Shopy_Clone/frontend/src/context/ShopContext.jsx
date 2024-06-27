import React, {createContext, useEffect, useState} from "react";

import Item from "../components/Item/Item";
export const ShopContext=createContext(null);

const getDefaultCart= ()=>{
    let cart={};
    for(let index=0;index< 300+1;index++){
        cart[index]=0;
    }
    return cart;
   }

const ShopContextProvider= (props)=>{

    const [all_product,setAll_product]=useState([]);
    const [cartItems, setCartItems]=useState(getDefaultCart());
   useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_product(data))
 
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/getcart',{
            method:'POST',
            headers:{
                Accept: "application/form-data",
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data))
    }

   },[])
   
   const addToCart = (ItemId) => {
    setCartItems((prev) => {
        return { ...prev, [ItemId]: (prev[ItemId] || 0) + 1 };
    });
    if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/addtocart', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ itemId: ItemId })
        })
        .then((response) => response.json()) // Ensure the response is parsed as JSON
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    }
}
const getTotalcartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            totalItems += cartItems[item];
        }
    }
    return totalItems;
}

    const GetTotal = ()=>{
        let total=0;
        for (const i in cartItems){
            if(cartItems[i]>0){
                let iteminfo=all_product.find((product)=>product.id===Number(i))
                total+= iteminfo.new_price* cartItems[i]
            }
        }
        return total
    }

   const removefromCart=(ItemId)=>{
    setCartItems( (prev) =>({...prev,[ItemId]:prev[ItemId]-1}) )
     if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/removefromcart', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ itemId: ItemId })
        })
        .then((response) => response.json()) // Ensure the response is parsed as JSON
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    
     }
    

  
} 
const contextValue ={getTotalcartItems ,GetTotal ,all_product , cartItems ,addToCart,removefromCart};

   return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
   )
}
export default ShopContextProvider