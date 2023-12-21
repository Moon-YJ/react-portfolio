import { createSlice } from '@reduxjs/toolkit';

const darkSlice = createSlice({
	name: 'dark',
	initialState: { isDark: false },
	reducers: {
		darkOn: state => {
			state.isDark = true;
		},
		darkOff: state => {
			state.isDark = false;
		},
		darkToggle: state => {
			state.isDark = !state.isDark;
		}
	}
});

export const { darkOn, darkOff, darkToggle } = darkSlice.actions;
export default darkSlice.reducer;
