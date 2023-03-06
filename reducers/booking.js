import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    // stage 1/3 (optionnel) : dispatch du bouton rechercher dans Home.js
    startDate: null,
    endDate: null,

    // stage 2/3 : dispatch du bouton réserver dans component Posts.js
    surfId: "",
    surfName: "",
    surfType: "",
    dayPrice: 0,
    deposit: 0,

    // stage 3/3 : dispatch du bouton payer dans component Payment.js
    totalPrice: 0,
    isPaid: false,
    transactionId: "",
    paymentMode: "",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  // stage 1/3 (optionnel) : dispatch du bouton rechercher dans Home.js
  // cas de figure où la personne va directement de search à booking
  reducers: {
    storeTenantDateRange: (state, action) => {
      state.value.startDate = action.payload.startDate;
      state.value.endDate = action.payload.endDate;
    },
    // stage 2/3 : dispatch du bouton réserver dans component Posts.js
    storePendingBooking: (state, action) => {
      state.value.surfId = action.payload.surfId;
      state.value.startDate = action.payload.startDate;
      state.value.endDate = action.payload.endDate;
      state.value.surfName = action.payload.surfName;
      state.value.surfType = action.payload.surfType;
      state.value.dayPrice = action.payload.dayPrice;
      state.value.deposit = action.payload.deposit;
    },
    // stage 3/3 : dispatch du bouton payer dans component Payment.js
    storeFulfilledBooking: (state, action) => {
      state.value.fulfilledBooking = {
        ...state.value.pendingBooking,
        ...action.payload,
      };
    },
  },
});

export const {
  storeTenantDateRange,
  storePendingBooking,
  storeFulfilledBooking,
} = bookingSlice.actions;
export default bookingSlice.reducer;
