import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("vigybag-cart")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        manageCartItem: (state, action) => {
            const { product, quantity } = action.payload

            const existingItem = state.items.find(item => item.id === product.id)

            let newQuantity = quantity
            if (existingItem) {
                newQuantity = existingItem.quantity + quantity > 0 ? existingItem.quantity + quantity : 0;
            }

            const updatedCart = state.items
                .filter(item => item.id !== product.id)
                .concat(newQuantity > 0 ? {
                    id: product.id,
                    title: product.title,
                    quantity: newQuantity,
                    price: product.price,
                    description: product.description,
                    total: newQuantity * product.price,
                    image: product.image,
                } : [])
                .sort((a, b) => a.id - b.id);

            localStorage.setItem("vigybag-cart", JSON.stringify(updatedCart))
            state.items = updatedCart
        },

        clearCart: (state) => {
            localStorage.setItem("vigybag-cart", JSON.stringify([]))
            state.items = []
        }
    }
})

export const { manageCartItem, clearCart } = cartSlice.actions
export default cartSlice.reducer