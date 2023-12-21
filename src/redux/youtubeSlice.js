import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchYoutube = createAsyncThunk('youtube', async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pId = process.env.REACT_APP_YOUTUBE_pID;
	const num = 7;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pId}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchYoutube.pending]: state => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.isLoading = true;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.data = action.payload;
			state.isLoading = true;
		}
	}
});

export default youtubeSlice.reducer;
