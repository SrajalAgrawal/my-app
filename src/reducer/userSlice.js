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
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "fulfilled";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;