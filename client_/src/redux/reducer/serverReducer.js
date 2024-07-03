import { createSlice } from '@reduxjs/toolkit'


const initialState = [
  {
    name:'steel',
    status:'muted',
  }
];

export const serverSlice = createSlice({
  name: 'serverList',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.push(action.payload);
    },
    decrement: (state) => {
      state.pop();
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement} = serverSlice.actions

export default serverSlice.reducer;

