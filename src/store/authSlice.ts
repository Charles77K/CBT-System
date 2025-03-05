import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const getEmail = () => {
  return localStorage.getItem("email") || null;
};

interface AuthState {
  email: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  email: getEmail(),
  isAuth: !!getEmail(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      (state.email = action.payload),
        (state.isAuth = !!action.payload),
        localStorage.setItem("email", state.email);
    },
    removeEmail: (state) => {
      state.email = null;
      state.isAuth = false;
      localStorage.removeItem("email");
    },
  },
});

export const { setEmail, removeEmail } = authSlice.actions;

export default authSlice.reducer;
