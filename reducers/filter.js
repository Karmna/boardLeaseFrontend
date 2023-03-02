import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: [],
    level: [],
    maxPrice: 0,
    minRating: 0,   
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.value.type = action.payload.type;
      state.value.level = action.payload.level;
      state.value.maxPrice = action.payload.maxPrice;
      state.value.minRating = action.payload.minRating;   
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
