import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const path = process.env.PUBLIC_URL;

export const fetchDepartment = createAsyncThunk('members', async () => {
	const data = await fetch(`${path}/DB/department.json`);
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
		[fetchDepartment.pending]: state => {
			state.isLoading = true;
		},
		[fetchDepartment.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchDepartment.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default departmentSlice.reducer;
