
// export function configureStore() {
//   return createStore(counterReducer)

import { configureStore } from "@reduxjs/toolkit/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../features/contact/counterSlice";

// }
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector