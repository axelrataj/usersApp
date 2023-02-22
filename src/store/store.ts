import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "store/features/users/usersSlice";

const saveToLocalStorage: (state: RootState) => void = (state) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("reduxStore", serialState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("reduxStore");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
