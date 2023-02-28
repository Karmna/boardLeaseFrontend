import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    favorites: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.favorites = action.payload.favorites;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.email = null;
      state.value.favorites = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
