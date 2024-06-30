import {configureStore} from '@reduxjs/toolkit';
import serverReducer from './reducer/something';


export const store = configureStore({
    reducer: {
        serverList:serverReducer
    }
})
