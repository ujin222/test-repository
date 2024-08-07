import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasOrderByLimit, updateDatas } from "../api/firebase";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    lq: undefined,
    isLoading: false,
    loadingError: "",
    order: "createdAt",
    hasNext: true,
  },
  reducer: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        // 밑 삼항연산자: lastQuery가 없음 => true
        if (action.payload.isReset) {
          state.items = action.payload.resultData;
        } else {
          // 밑 삼항연산자: lastQuery가 있음 => false
          // 더보기 아이템들 push 로 넣는 방법
          action.payload.resultData.forEach((data) => {
            state.items.push(data);
          });
          // state.items = [...state.items, ...action.payload.resultData];
        }
        // lastQuery 가 없으면 false , 있으면 true
        // if (!action.payload.lastQuery) {
        //   state.hasNext = false;
        // } else {
        //   state.hasNext = true;
        // }
        // state.hasNext = action.payload.lastQuery ? true : false;
        // lastQuery 가 있으면 true, 없으면 false
        state.hasNext = !!action.payload.lastQuery;
        state.lq = action.payload.lastQuery;
        state.isLoading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingError = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.isLoading = false;
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasOrderByLimit(
        collectionName,
        queryOptions
      );
      resultData.isReset = !queryOptions.lastQuery ? true : false;
      // 쿼리 옵션의 라스트 쿼리가 없다면 true, 있다면 false 맞나..
      return resultData;
    } catch (error) {
      return "FETCH Error: " + error;
      // console.log("FETCH Error: ", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj, imgUrl }) => {
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateObj,
        imgUrl
      );
      return resultData;
    } catch (error) {
      return "UPDATE Error: " + error;
    }
  }
);

export default foodSlice;
export { fetchItems, updateItem };
export const { setOrder, setHasNext } = foodSlice.actions;
