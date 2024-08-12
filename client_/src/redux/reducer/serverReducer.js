import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  members: [],
  invites:[],
  url:''
};

export const serverSlice = createSlice({
  name: "serverInfo",
  initialState,
  reducers: {
    setServerInfo: (state, action) => {
      console.log(action)
      const { _id, name, members ,invites,url} = action.payload;
      state._id = _id;
      state.name = name;
      state.members = members;
      state.invites = invites;
      state.url = url;
    },
    resetServerInfo: (state) => {
      state._id = null;
      state.name = null;
      state.members = [];
      state.invites = [];
      state.url = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setServerInfo,resetServerInfo} = serverSlice.actions;

export default serverSlice.reducer;
