import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    authMethod: String,
    token: null,
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    pendingBooking: null, // object
    fulfilledBooking: null, // object
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.authMethod = action.payload.authMethod;
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
    updateUserProfile: (state, action) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
    },
    storePendingBooking: (state, action) => {
      state.value.pendingBooking = action.payload;
    },
    storeFulfilledgBooking: (state, action) => {
      state.value.fulfilledBooking = {
        ...state.value.pendingBooking,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
