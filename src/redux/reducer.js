import { combineReducers } from 'redux';
import * as types from './actionType';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBERS.start:
			return state;
		case types.MEMBERS.success:
			return { ...state, members: action.payload };
		case types.MEMBERS.fail:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return state;
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return state;
		case types.FLICKR.success:
			return { ...state, flickr: action.payload };
		case types.FLICKR.fail:
			return { ...state, flickr: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = { modal: false }, action) => {
	switch (action.type) {
		case types.MODAL.start:
			return { ...state, modal: action.payload };
		default:
			return state;
	}
};

const menuReducer = (state = { menu: false }, action) => {
	switch (action.type) {
		case types.MENU.start:
			return { ...state, menu: action.payload };
		default:
			return state;
	}
};

const darkReducer = (state = { dark: false }, action) => {
	switch (action.type) {
		case types.DARK.start:
			return { ...state, dark: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickrReducer,
	modalReducer,
	menuReducer,
	darkReducer
});
export default reducers;
