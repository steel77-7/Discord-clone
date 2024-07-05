import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  members: [],
  isServerChat: false,
  name: null,
  createdAt: null,
};

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    /* setCurrentChat: (state, action) => {
      console.log(action.payload)
      state = action.payload;
    } */ setCurrentChat: (state, action) => {
      const { _id, members, isServerChat, name, createdAt } = action.payload;
      state._id = _id;
      state.members = members;
      state.isServerChat = isServerChat;
      state.name = name;
      state.createdAt = createdAt;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat } = currentChatSlice.actions;

export default currentChatSlice.reducer;
