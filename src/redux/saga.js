import { takeLatest, call, put, fork, all } from '@redux-saga/core/effects';
import { fetchMember, fetchYoutube } from './api';
import * as types from './actionType';

function* callMembers() {
	yield takeLatest(types.MEMBERS.start, function* () {
		try {
			const response = yield call(fetchMember);
			yield put({ type: types.MEMBERS.success, payload: response });
		} catch (err) {
			yield put({ type: types.MEMBERS.fail, payload: err });
		}
	});
}

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, function* () {
		try {
			const response = yield call(fetchYoutube);
			yield put({ type: types.YOUTUBE.success, payload: response.items });
		} catch (err) {
			yield put({ type: types.YOUTUBE.fail, payload: err });
		}
	});
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callYoutube)]);
}
