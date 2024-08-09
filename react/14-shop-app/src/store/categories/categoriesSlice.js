import { createSlice } from "@reduxjs/toolkit";
import { categoriesName } from "./categories";

const initialState = categoriesName.All;

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { setActiveCategory } = categoriesSlice.actions;
