import { createSlice } from '@reduxjs/toolkit'

//check if theres user in localstorage, if not then null
// note: stored in localstorage becomes a string
const initialState = {
    // JSON.parse (parsing it back from String to JSON object)
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // action creator
        setCredentials: (state, action) => {
            // state contains the newly carried data
            state.userInfo = action.payload;
            // update localStorage with updated data
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})

// extracts the action creator from the slice
export const { setCredentials } = authSlice.actions;

// exports the reducer for use in the Redux store
export default authSlice.reducer;



