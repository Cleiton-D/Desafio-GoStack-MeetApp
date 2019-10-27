import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
	name: Yup.string().required('O nome é obrigatório!'),
	email: Yup.string()
		.email('Insira um e-mail válido!')
		.required('O e-mail é obrigatório!'),
	oldPassword: Yup.string(),
	password: Yup.string()
		.when('oldPassword', (oldPassword, field) =>
			oldPassword
			? field.min(8, 'A senha deve ter pelo menos 8 caracteres!').required('A senha é obrigatória!')
			: field
		),
	confirmPassword: Yup.string().when('password', (password, field) =>
		password
			? field
					.required('A confirmação da senha é obrigatória!')
					.oneOf([Yup.ref('password')], 'As senhas não conferem!')
			: field
	),
});

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	function handleSubmit(data) {
		dispatch(updateProfileRequest(data));
	}

	return (
		<Container>
			<Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
				<Input name="name" placeholder="Seu nome completo" />
				<Input name="email" type="email" placeholder="Seu e-mail" />
				<hr />
				<Input name="oldPassword" type="password" placeholder="Senha atual" />
				<Input name="password" type="password" placeholder="Nova senha" />
				<Input
					name="confirmPassword"
					type="password"
					placeholder="Confirmação de senha"
				/>
				<button type="submit">
					<MdAddCircleOutline color="#fff" size={20} />
					Salvar perfil
				</button>
			</Form>
		</Container>
	);
}
