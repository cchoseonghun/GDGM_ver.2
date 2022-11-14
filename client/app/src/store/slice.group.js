import { createSlice } from "@reduxjs/toolkit";

let group = createSlice({
    name: 'group', 
    initialState: {
        _id: '', 
        name: '', 
        members: [], 
    }, 
    reducers: {
        setGroup(state, action){
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.members = action.payload.members;
        }, 
    }
})
export let { setGroup } = group.actions

export default group