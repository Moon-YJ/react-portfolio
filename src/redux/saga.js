import { takeLatest, call, put, fork, all } from '@redux-saga/core/effects';
import { fetchMember } from './api';
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

export default function* rootSaga() {
	yield all([fork(callMembers)]);
}
