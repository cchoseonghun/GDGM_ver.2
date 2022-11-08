import { createSlice } from "@reduxjs/toolkit";

let group = createSlice({
    name: 'group', 
    initialState: {
        idx: 0, 
        name: '', 
        members: [], 
    }, 
    reducers: {
        setGroup(state, action){
            state.idx = action.payload.idx;
            state.name = action.payload.name;
            state.members = action.payload.members;
        }, 
    }
})
export let { setGroup } = group.actions

export default group