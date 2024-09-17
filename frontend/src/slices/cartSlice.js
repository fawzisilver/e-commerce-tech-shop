// createSlice is for managing app state. For local state management (createApi is for endpoints that deal with async requests)
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//save to local storage
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : { cartItems: []};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id 
                    ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            //updated state is returned to redux
            return updateCart(state);
        },
    }
})

//export action (when adding new functions as an action)
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;