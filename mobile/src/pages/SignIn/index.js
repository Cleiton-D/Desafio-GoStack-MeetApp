import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '~/components/Logo';

import Background from '~/components/Background';

import { signInRequest } from '~/store/modules/auth/actions';

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
	const profile = useSelector(state => state.user.profile);

	const [email, setEmail] = useState(profile ? profile.email : '');
	const [password, setPassword] = useState('');

	const passwordRef = useRef();

	function handleSubmit() {
		dispatch(signInRequest(email, password));
	}

	return (
		<Background>
			<Container>
				<Logo size={42} />
				<Form>
					<FormInput
						keyboardType="email-address"
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Digite seu e-mail"
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current.focus()}
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
						Entrar
					</ButtonSubmit>
				</Form>
				<SignLink onPress={() => navigation.navigate('SignUp')}>
					<SignText>Criar conta grátis</SignText>
				</SignLink>
			</Container>
		</Background>
	);
}
