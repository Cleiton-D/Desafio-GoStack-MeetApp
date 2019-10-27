import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '~/components/Logo';

import Background from '~/components/Background';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
	Container,
	Form,
	FormInput,
	ButtonSubmit,
	SignLink,
	SignText,
} from './styles';

export default function SignIn({ navigation }) {
	const dispatch = useDispatch();

	const loading = useSelector(state => state.auth.loading);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const passwordRef = useRef();
	const emailRef = useRef();

	function handleSubmit() {
		dispatch(signUpRequest(name, email, password));
	}

	return (
		<Background>
			<Container>
				<Logo size={42} />
				<Form>
					<FormInput
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Nome completo"
						returnKeyType="next"
						onSubmitEditing={() => emailRef.current.focus()}
						value={name}
						onChangeText={setName}
					/>
					<FormInput
						keyboardType="email-address"
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Digite seu e-mail"
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current.focus()}
						ref={emailRef}
						value={email}
						onChangeText={setEmail}
					/>
					<FormInput
						secureTextEntry
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Digite sua senha"
						returnKeyType="send"
						onSubmitEditing={handleSubmit}
						ref={passwordRef}
						value={password}
						onChangeText={setPassword}
					/>
					<ButtonSubmit loading={loading} onPress={handleSubmit}>
						Criar conta
					</ButtonSubmit>
				</Form>
				<SignLink onPress={() => navigation.navigate('SignIn')}>
					<SignText>Já tenho login</SignText>
				</SignLink>
			</Container>
		</Background>
	);
}
