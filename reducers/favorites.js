import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      state.value = action.payload;
    },    
  },
});

export const { updateFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
