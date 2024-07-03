import {configureStore} from '@reduxjs/toolkit';
import serverReducer from './reducer/serverReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
    reducer: {
        serverList:serverReducer,
        user : userReducer
    }
})
