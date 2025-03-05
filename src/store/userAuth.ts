import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getEmail = () => {
  return localStorage.getItem("email") || null;
};

interface UserState {
  email: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  email: getEmail(),
  isAuth: !!getEmail(),
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      (state.email = action.payload), (state.isAuth = !!action.payload);
      localStorage.setItem("email", state.email);
    },
    clearUserEmail: (state) => {
      state.email = null;
      state.isAuth = false;
      localStorage.removeItem("email");
    },
  },
});

export const { setUserEmail, clearUserEmail } = userSlice.actions;

export default userSlice.reducer;
