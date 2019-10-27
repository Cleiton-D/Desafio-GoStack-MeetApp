import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('Insira um e-mail válido!')
		.required('O e-mail é obrigatório!'),
	password: Yup.string().required('A senha é obrigatória!'),
});

export default function SignIn() {
	const dispatch = useDispatch();
	const load = useSelector(state => state.auth.loading);

	function handleSubmit({ email, password }) {
		dispatch(signInRequest(email, password));
	}

	return (
		<>
			<img src={logo} alt="Meetup" />
			<Form schema={schema} onSubmit={handleSubmit}>
				<Input name="email" type="email" placeholder="Digite seu email" />
				<Input name="password" type="password" placeholder="Digite sua senha" />
				<button type="submit">{load ? 'Carregando...' : 'Entrar'}</button>
				<Link to="/signup">Criar conta grátis</Link>
			</Form>
		</>
	);
}
