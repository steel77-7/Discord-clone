import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      _id : null,
      name :null,
      email : null,
      createdAt : null,
      friends : null,
      friendRequests: null,
      img :null
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email, createdAt,friendRequests,img,friends } = action.payload;
      console.log("payload : ", action,state)
      state._id = _id;
      state.name = name;
      state.email = email;
      state.createdAt = createdAt;
      state.friends = friends;
      state.friendRequests = friendRequests;
      state.img = img;
    },
   
    logoutUser: (state) => {
      
      state._id = null
      state.name = null
      state.email = null;
      state.createdAt = null;
      state.friends = null;
      state.friendRequests = null;
      state.img = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
