import { createSlice } from "@reduxjs/toolkit";

export const DocumentSlice = createSlice({
  name: "document",
  initialState: {
    docs: [],
  },
  reducers: {
    setAllDocument: (state, action) => {
      state.docs = action.payload.data;
    },
  },
});

export const { setAllDocument } = DocumentSlice.actions;

export default DocumentSlice.reducer;
