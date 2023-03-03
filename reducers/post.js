import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    type: [],
    level: [],
    placeName: "",
    name: "",
    pictures:[],
},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    selectedSurf: (state, action) => {
      state.value.type = action.payload.type;
      state.value.level = action.payload.level;
      state.value.name = action.payload.name;
      state.value.placeName = action.payload.placeName;
      state.value.pictures = action.payload.pictures;
   
    },
  },
});

export const { selectedSurf } = postSlice.actions;
export default postSlice.reducer;