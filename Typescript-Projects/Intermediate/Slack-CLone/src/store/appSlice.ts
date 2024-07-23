import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IRoomState {
  roomId: null;
}

const initialState: IRoomState = { roomId: null };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state: RootState) => state.app.roomId;

export default appSlice.reducer;
