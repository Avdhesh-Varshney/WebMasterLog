import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export { rootReducer };
