import { createSlice } from "@reduxjs/toolkit";

let raid = createSlice({
    name: 'raid', 
    initialState: {
        data: {}, 
        modal: {}, 
    }, 
    reducers: {
        setRaid(state, action) {
            state.data = action.payload;
        }, 
        setModal(state, action) {
            state.modal = action.payload;
        }
    }
})
export let { setRaid, setModal } = raid.actions

export default raid