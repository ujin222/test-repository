import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
});

export default store;
