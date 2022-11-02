import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user', 
    initialState: { isLogin: false }, 
    reducers: {
        setIsLogin(state, action){
            state.isLogin = Boolean(action.payload);
        }, 
    }
})
export let { setIsLogin } = user.actions

export default user;