import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer, { fetchDepartment } from './redux/departmentSlice';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import flickrReducer, { fetchFlickr } from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';
import darkReducer from './redux/darkSlice';

const store = configureStore({
	reducer: {
		members: departmentReducer,
		youtube: youtubeReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
		dark: darkReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App apiArr={[fetchDepartment, fetchYoutube, fetchFlickr]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
