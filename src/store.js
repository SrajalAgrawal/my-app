import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userSlice';
import allUsersReducer from "./reducer/allUsersSlice";
import searchReducer from "./reducer/searchSlice";
import paginationReducer from "./reducer/paginationSlice";
import taskReducer from "./reducer/taskSlice";


export const store = configureStore({
  reducer: {
    user : userReducer,
    allUsers : allUsersReducer,
    task : taskReducer,
    search : searchReducer,
    paginator : paginationReducer,
  },
});