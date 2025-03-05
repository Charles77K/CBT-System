import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userSlice from "./userAuth";
import questionSlice from "./questionsSlice";

const store = configureStore({
  reducer: { auth: authReducer, userAuth: userSlice, questions: questionSlice },
});

export default store;

export type Rootstate = ReturnType<typeof store.getState>;
