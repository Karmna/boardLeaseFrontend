import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const surfsSlice = createSlice({
  name: "surfs",
  initialState,
  reducers: {
    addSurfs: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSurfs } = surfsSlice.actions;
export default surfsSlice.reducer;
