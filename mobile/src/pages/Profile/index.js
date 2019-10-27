import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, Separator, SButton } from './styles';

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	const [name, setName] = useState(profile.name);
	const [email, setEmail] = useState(profile.email);
	const [oldPassword, setOldPassword] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	const emailRef = useRef();
	const oldPasswordRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	useEffect(() => {
		setOldPassword('');
		setPassword('');
		setConfirmPassword('');
	}, [profile]);

	function handleSubmit() {
		dispatch(
			updateProfileRequest({
				name,
				email,
				oldPassword,
				password,
				confirmPassword,
			})
		);
	}

	function handleLogout() {
		dispatch(signOut());
	}

	return (
		<Background>
			<Header />
			<Container>
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
						onSubmitEditing={() => oldPasswordRef.current.focus()}
						ref={emailRef}
						value={email}
						onChangeText={setEmail}
					/>
					<Separator />

					<FormInput
						secureTextEntry
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Senha atual"
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current.focus()}
						ref={oldPasswordRef}
						value={oldPassword}
						onChangeText={setOldPassword}
					/>
					<FormInput
						secureTextEntry
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Nova senha"
						returnKeyType="next"
						onSubmitEditing={() => confirmPasswordRef.current.focus()}
						ref={passwordRef}
						value={password}
						onChangeText={setPassword}
					/>
					<FormInput
						secureTextEntry
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Confirmação de senha"
						returnKeyType="send"
						onSubmitEditing={handleSubmit}
						ref={confirmPasswordRef}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<SButton onPress={handleSubmit}>Salvar perfil</SButton>
					<SButton onPress={handleLogout}>Sair do Meetup</SButton>
				</Form>
			</Container>
		</Background>
	);
}

Profile.navigationOptions = {
	tabBarLabel: 'Meu perfil',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="person" size={20} color={tintColor} />
	),
};
