import { createSlice } from '@reduxjs/toolkit'


const initialState = [
  {
    name:null,
    email:null,
    createdAt:null,

  }
];

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    logoutUser: (state) => {
      state.value= null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser} = userSlice.actions

export default userSlice.reducer;

