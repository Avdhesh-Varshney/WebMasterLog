import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});