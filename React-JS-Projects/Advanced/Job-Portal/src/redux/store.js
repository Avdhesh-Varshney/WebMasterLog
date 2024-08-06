import { configureStore } from "@reduxjs/toolkit";

import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

const { dispatch } = store;
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();

export { store, dispatch, useDispatch, useSelector };
