import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice.js";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export default store;
