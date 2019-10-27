import React, { useEffect, useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, MeetupList } from './styles';

export default function Subscriptions() {
	const [subscriptions, setSubscriptions] = useState([]);

	async function loadSubscriptions() {
		const response = await api.get('subscriptions');

		const data = response.data.map(subscription => ({
			...subscription,
			meetup: {
				...subscription.meetup,
				dateFormatted: format(
					parseISO(subscription.meetup.data),
					"d 'de' MMMM', às' hh:mm ",
					{ locale: pt }
				),
			},
		}));

		setSubscriptions(data);
	}

	useEffect(() => {
		loadSubscriptions();
	}, []);

	async function handleUnsubscribe(id) {
		try {
			await api.delete(`subscriptions/${id}`);
			Alert.alert('Sucesso!', 'Sua inscrição foi cancelada.');
			loadSubscriptions();
		} catch (err) {
			Alert.alert('Falha ao realizar inscrição', err.response.data.error);
		}
	}

	return (
		<Background>
			<Header />
			<NavigationEvents onWillFocus={loadSubscriptions} />
			<Container>
				<MeetupList
					data={subscriptions}
					keyExtractor={item => String(item.id)}
					renderItem={({ item: subscription }) => {
						return (
							<Meetup
								data={subscription.meetup}
								onClick={() => handleUnsubscribe(subscription.id)}
								buttonLabel="Cancelar inscrição"
							/>
						);
					}}
				/>
			</Container>
		</Background>
	);
}

Subscriptions.navigationOptions = {
	tabBarLabel: 'Incrições',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="local-offer" size={20} color={tintColor} />
	),
};
