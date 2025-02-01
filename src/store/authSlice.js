import { createSlice } from "@reduxjs/toolkit";
const getEmail = () => {
	return localStorage.getItem("email") || null;
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
		email: getEmail(),
		isAuth: !!getEmail(),
	},
	reducers: {
		setEmail: (state, action) => {
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
