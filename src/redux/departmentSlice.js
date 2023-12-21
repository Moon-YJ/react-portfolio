import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchDepartment = createAsyncThunk('members', async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
	const json = await data.json();
	return json;
});

const departmentSlice = createSlice({
	name: 'members',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchDepartment.pending]: state => (state.isLoading = true),
		[fetchDepartment.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.isLoading = true;
		},
		[fetchDepartment.rejected]: (state, action) => {
			state.data = action.payload;
			state.isLoading = true;
		}
	}
});

export default departmentSlice.reducer;
