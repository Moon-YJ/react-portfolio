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

const reducers = combineReducers({ memberReducer });
export default reducers;
