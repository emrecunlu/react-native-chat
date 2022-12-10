import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visible: false,
}

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open: (state) => {
            state.visible = true
        },
        close: (state) => {
            state.visible = false
        }
    }
})

export default modal.reducer

export const {open, close} = modal.actions