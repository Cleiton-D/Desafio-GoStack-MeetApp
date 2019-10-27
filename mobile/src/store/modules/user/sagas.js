import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
	try {
		const { name, email, ...rest } = payload.data;

		const profile = {
			name,
			email,
			...(rest.oldPassword ? rest : {}),
		};

		const response = yield call(api.put, 'users', profile);

		Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

		yield put(updateProfileSuccess(response.data));
	} catch (err) {
		Alert.alert(
			'Falha na atualização!',
			'Houve um erro na atualização do perfil, verifique seus dados!'
		);
	}
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
// "name": "Cleiton Dione",
// "email": "cleitonkiper@gmail.com",
// "oldPassword": "ahnerth789",
// "password": "ahnerth456",
// "confirmPassword": "ahnerth456"
