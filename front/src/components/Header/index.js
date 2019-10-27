import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<Link to="/">
					<img src={logo} alt="Meetup" />
				</Link>
				<aside>
					<div>
						<strong>{profile.name}</strong>
						<Link to="/profile">Meu perfil</Link>
					</div>
					<button type="button" onClick={handleSignOut}>
						Sair
					</button>
				</aside>
			</Content>
		</Container>
	);
}
