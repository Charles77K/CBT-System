import { createSlice } from "@reduxjs/toolkit";

const getEmail = () => {
	return localStorage.getItem("email") || null;
};

const userSlice = createSlice({
	name: "userAuth",
	initialState: {
		email: getEmail(),
		isAuth: !!getEmail(),
	},
	reducers: {
		setUserEmail: (state, action) => {
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
