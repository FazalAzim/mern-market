import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: true,
	isSignedIn: false,
	user: {},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setSignedIn: (state, action) => {
			state.isSignedIn = action.payload;
			state.isLoading = false;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setSignedIn, setUser } = userSlice.actions;

export default userSlice.reducer;
