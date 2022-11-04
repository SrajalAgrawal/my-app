import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: "",
    sort:"Due Date"
  },

  reducers: {
    setSearch: (state, action) => {
      state.data = action.payload;
      console.log("1");
    },
    removeSearch: (state) => {
      state.data = "";
      console.log("2");
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      console.log("3");
    },
  },
});

export const { setSearch,removeSearch,setSort } = searchSlice.actions;
export default searchSlice.reducer;