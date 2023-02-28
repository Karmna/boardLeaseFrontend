import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSurfByPlace: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addFilter } = searchSlice.actions;
export default searchSlice.reducer;
