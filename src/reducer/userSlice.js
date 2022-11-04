import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../API/api";

export const getUser = createAsyncThunk("user/getUser", async () => {
  let res = await api.me();
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    admin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = {};
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";

      if (action.payload.role === 1) {
        state.admin = true;
      }
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { setUser, removeUser, setAdmin } = userSlice.actions;
export default userSlice.reducer;