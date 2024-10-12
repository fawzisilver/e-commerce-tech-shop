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
            if(action.payload) {
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            } else {
                console.error('Invalid payload for setCredentials:', action.payload)
            }
            
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
})

// extracts the action creator from the slice
export const { setCredentials, logout } = authSlice.actions;

// exports the reducer for use in the Redux store
export default authSlice.reducer;





