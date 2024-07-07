import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  chats: [],
  members: [],
};

export const serverSlice = createSlice({
  name: "serverInfo",
  initialState,
  reducers: {
    setServerInfo: (state, action) => {
      const { _id, name, chats, members } = action.payload;
      state._id = _id;
      state.name = name;
      state.chats = chats;
      state.members = members;
    },
    resetServerInfo: (state) => {
      state._id = null;
      state.name = null;
      state.chats = [];
      state.members = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setServerInfo,resetServerInfo} = serverSlice.actions;

export default serverSlice.reducer;
