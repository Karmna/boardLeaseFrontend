import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    
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
      state.value.placeName = action.payload.placeName;
      state.value.availabilities = action.payload.availabilities;
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
