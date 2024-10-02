// createSlice is for managing app state. For local state management (createApi is for endpoints that deal with async requests)
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//save to local storage / cartItem is a property with array
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) 
:
 { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    
    reducers: {
        addToCart: (state, action) => {
            // action.payload = contains the data you want to update
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
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            return updateCart(state);
        }
    }
})

//export action (when adding new functions as an action)
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;