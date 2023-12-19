import { combineReducers } from 'redux';
import * as types from './action';

const membersReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
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

const reducers = combineReducers({ membersReducer, youtubeReducer, modalReducer });
export default reducers;
