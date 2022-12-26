import { configureStore } from "@reduxjs/toolkit";
import audioPlayerReducer from "../providers/audioPlayerSlice";

export const store = configureStore({
  reducer: {
    audioPlayerStore: audioPlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
