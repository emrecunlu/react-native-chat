import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/user'
import modalReducer from './features/modal';

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer
    }
})