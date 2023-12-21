import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './redux/departmentSlice';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		members: departmentReducer,
		youtube: youtubeReducer,
		flickr: flickrReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
