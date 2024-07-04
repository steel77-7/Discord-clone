import { createSlice } from "@reduxjs/toolkit";

const initialState = []

/* const initialState = {
    value:1
  } */

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDmlist: (state, action) => {
     
     
      state.push(action.payload)
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
