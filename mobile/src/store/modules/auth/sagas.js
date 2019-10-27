import { all, call, takeLatest, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import AsyncAlert from 'react-native-alert-async';

import api from '~/services/api';
import navigation from '~/services/navigation';

import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ payload }) {
	try {
		const { email, password } = payload;

		const response = yield call(api.post, 'sessions', {
			email,
			password,
		});

		const { token, user } = response.data;

		api.defaults.headers.Authorization = `Bearer ${token}`;
		yield put(signInSuccess(token, user));
	} catch (err) {
		Alert.alert(
			'Falha na autenticação',
			'Houve um erro no login, verifique seus dados!'
		);

		yield put(signFailure());
	}
}

export function* signUp({ payload }) {
	try {
		const response = yield call(api.post, 'users', payload);

		yield put(signUpSuccess(response.data));

		yield AsyncAlert('Sucesso!', 'Conta criada com sucesso');

		navigation.navigate('SignIn');
	} catch (err) {
		Alert.alert(
			'Falha no cadastro',
			'Houve um erro no cadastro, verifique seus dados'
		);

		yield put(signFailure());
	}
}

export function setToken({ payload }) {
	if (!payload) return;

	const { token } = payload.auth;
	if (token) {
		api.defaults.headers.Authorization = `Bearer ${token}`;
	}
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/SIGN_IN_REQUEST', signIn),
	takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
