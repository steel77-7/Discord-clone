import {configureStore} from '@reduxjs/toolkit';
import serverReducer from './reducer/serverReducer';
import userReducer from './reducer/userReducer';
import currentChatReducer from './reducer/currentChatReducer';

export const store = configureStore({
    reducer: {
        serverList:serverReducer,
        user : userReducer,
        currentChat  : currentChatReducer
    }
})
