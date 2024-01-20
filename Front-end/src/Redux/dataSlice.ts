import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

interface DataState {
  layoutDisposition: boolean;
}

const initialState: DataState = {
  layoutDisposition: true,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLayoutState: (state, action) => {
      state.layoutDisposition = action.payload;
    },
  },
});

export const { setLayoutState } = dataSlice.actions;
export const getLayoutDisposition = (state: AppState) =>
  state.data.layoutDisposition;

export default dataSlice.reducer;
