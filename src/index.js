import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CommonProvider } from './hooks/useCommonData';

ReactDOM.render(
	<BrowserRouter>
		<CommonProvider>
			<App />
		</CommonProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
