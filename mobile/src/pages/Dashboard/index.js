import React, { useEffect, useState, useMemo } from 'react';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, DateSelector, DateText, MeetupList } from './styles';

export default function Dashboard() {
	const [date, setDate] = useState(new Date());
	const [meetups, setMeetups] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [page, setPage] = useState(1);

	const dateFormatted = useMemo(
		() => format(date, "d 'de' MMMM", { locale: pt }),
		[date]
	);

	async function loadMeetups(pageLoad = 1) {
		const response = await api.get('meetups', {
			params: { date, page: pageLoad },
		});

		const data = response.data.map(meetup => ({
			...meetup,
			dateFormatted: format(parseISO(meetup.data), "d 'de' MMMM', às' hh:mm ", {
				locale: pt,
			}),
			subscribed: meetup.subscription.length > 0,
		}));

		setMeetups(pageLoad >= 2 ? [...meetups, ...data] : data);
		setPage(pageLoad)
		setRefreshing(false);
	}

	useEffect(() => {
		loadMeetups();
	}, [date]);

	function handlePrevDay() {
		setDate(subDays(date, 1));
	}

	function handleNextDay() {
		setDate(addDays(date, 1));
	}

	function refreshMeetups() {
		setRefreshing(true);
		loadMeetups();
	}

	function handleLearnMore() {
		setRefreshing(true);
		loadMeetups(page + 1);
	}

	async function handleSubscribe(id) {
		try {
			await api.post('subscriptions', { meetup_id: id });
			Alert.alert('Sucesso!', 'Parabéns! Você está inscrito neste meetup.');
			loadMeetups();
		} catch (err) {
			Alert.alert('Falha ao realizar inscrição', err.response.data.error);
		}
	}

	return (
		<Background>
			<Header />
			<NavigationEvents onWillFocus={loadMeetups} />
			<Container>
				<DateSelector>
					<TouchableOpacity onPress={handlePrevDay}>
						<Icon name="chevron-left" size={30} color="#fff" />
					</TouchableOpacity>
					<DateText>{dateFormatted}</DateText>
					<TouchableOpacity onPress={handleNextDay}>
						<Icon name="chevron-right" size={30} color="#fff" />
					</TouchableOpacity>
				</DateSelector>
				<MeetupList
					onEndReachedThreshold={0.2}
					onEndReached={handleLearnMore}
					data={meetups}
					keyExtractor={item => String(item.id)}
					onRefresh={refreshMeetups}
					refreshing={refreshing}
					renderItem={({ item: meetup }) => {
						return (
							<Meetup
								data={meetup}
								onClick={() => handleSubscribe(meetup.id)}
								buttonLabel="Realizar inscrição"
								disabledButton={meetup.subscribed}
							/>
						);
					}}
				/>
			</Container>
		</Background>
	);
}

Dashboard.navigationOptions = {
	tabBarLabel: 'Meetups',
	tabBarIcon: ({ tintColor }) => (
		<Icon name="format-list-bulleted" size={20} color={tintColor} />
	),
};
