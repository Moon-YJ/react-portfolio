import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { toggle: false },
	reducers: {
		menuToggle: state => {
			state.toggle = !state.toggle;
		},
		menuClose: state => {
			state.toggle = false;
		}
	}
});

export const { menuToggle, menuClose } = menuSlice.actions;
export default menuSlice.reducer;
