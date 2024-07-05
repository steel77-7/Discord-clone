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
    setCurretnChat: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentChat } = currentChatSlice.actions;

export default currentChatSlice.reducer;
