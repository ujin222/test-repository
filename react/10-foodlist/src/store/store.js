import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
  // middleware: serializableCheck 을 false 로 바꿔주면 뭔 이상한 오류가 제거됨.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
