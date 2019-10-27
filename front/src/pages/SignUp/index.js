import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
	name: Yup.string().required('O nome é obrigatório!'),
	email: Yup.string()
		.email('Insira um e-mail válido!')
		.required('O e-mail é obrigatório!'),
	password: Yup.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres!')
		.required('A senha é obrigatória!'),
});

export default function SignUp() {
	const dispatch = useDispatch();
	const load = useSelector(state => state.auth.loading);

	function handleSubmit({ name, email, password }) {
		dispatch(signUpRequest(name, email, password));
	}

	return (
		<>
			<img src={logo} alt="Meetup" />
			<Form schema={schema} onSubmit={handleSubmit}>
				<Input name="name" placeholder="Nome Completo" />
				<Input name="email" type="email" placeholder="Digite seu email" />
				<Input name="password" type="password" placeholder="Digite sua senha" />
				<button type="submit">{load ? 'Carregando...' : 'Criar conta'}</button>
				<Link to="/">Já tenho login</Link>
			</Form>
		</>
	);
}
