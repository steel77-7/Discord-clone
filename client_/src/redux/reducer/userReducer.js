import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  email: null,
  createdAt: null,
};

/* const initialState = {
    value:1
  } */

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email, createdAt,friendRequests,friends } = action.payload;
      console.log("payload : ", action,state)
      state._id = _id;
      state.name = name;
      state.email = email;
      state.createdAt = createdAt;
      state.friends = friends;
      state.friendRequests = friendRequests;
    }
    /* setUser: (state, action) => {
        state.value += 2;
    } */,
    logoutUser: (state) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.createdAt = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
