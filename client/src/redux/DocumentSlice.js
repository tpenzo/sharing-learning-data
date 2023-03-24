import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docs: [],
}

export const DocumentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setAllDocument: (state, action) => {
      state.docs = action.payload.data;
    },
    resetDocumentSlice: () => initialState
  },
});

export const { setAllDocument, resetDocumentSlice } = DocumentSlice.actions;

export default DocumentSlice.reducer;
