import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container, Header, ListMeetups } from './styles';

import api from '~/services/api';

export default function Dashboard() {
	const [meetups, setMeetups] = useState([]);

	useEffect(() => {
		async function loadMeetups() {
			const response = await api.get('organizing');

			const data = response.data.map(meetup => ({
				...meetup,
				dateFormatted: format(
					parseISO(meetup.data),
					"d 'de' MMMM', às' hh:mm ",
					{ locale: pt }
				),
			}));

			setMeetups(data);
		}
		loadMeetups();
	}, []);

	return (
		<Container>
			<Header>
				<span>Meus meetups</span>
				<Link to="/new">
					<MdAddCircleOutline color="#fff" size={20} />
					<span>Novo meetup</span>
				</Link>
			</Header>
			<ListMeetups>
				{meetups.map(meetup => (
					<li key={String(meetup.id)}>
						<Link to={`/details/${meetup.id}`}>
							<span>{meetup.title}</span>
							<div>
								<span>{meetup.dateFormatted}</span>
								<MdChevronRight color="#fff" size={20} />
							</div>
						</Link>
					</li>
				))}
			</ListMeetups>
		</Container>
	);
}
