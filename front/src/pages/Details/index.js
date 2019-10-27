import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { Container, ButtonEdit, ButtonCancel, AlertContainer } from './styles';

import api from '~/services/api';

export default function Details({ match, history }) {
	const [meetup, setMeetup] = useState({});

	useEffect(() => {
		async function loadMeetup() {
			const { id } = match.params;
			const response = await api.get(`/meetups/${id}`);

			const data = {
				...response.data,
				dateFormatted: format(
					parseISO(response.data.data),
					"d 'de' MMMM', às' hh:mm ",
					{ locale: pt }
				),
			};

			setMeetup(data);
		}

		loadMeetup();
	}, [match.params, match.params.id, meetup.data]);

	function renderAlert(onClose, id) {
		return (
			<AlertContainer>
				<strong>Você tem certeza?</strong>
				<hr />
				<p>Deseja cancelar este meetup?</p>
				<div>
					<button
						type="button"
						style={{ backgroundColor: '#d44059' }}
						onClick={onClose}
					>
						Não
					</button>
					<button
						style={{ backgroundColor: '#209fe8' }}
						type="button"
						onClick={async () => {
							await api.delete(`/meetups/${id}`);
							onClose();
							toast.success('Meetup cancelada com sucesso!');
							history.push('/dashboard');
						}}
					>
						Sim
					</button>
				</div>
			</AlertContainer>
		);
	}

	function handleCancel() {
		const { id } = match.params;

		confirmAlert({
			customUI: ({ onClose }) => renderAlert(onClose, id),
		});
	}

	return (
		<Container>
			<div>
				<strong>{meetup.title}</strong>
				<div>
					<ButtonEdit to={`/edit/${meetup.id}`} type="button">
						<MdEdit color="#fff" size={20} />
						Editar
					</ButtonEdit>
					<ButtonCancel type="button" onClick={handleCancel}>
						<MdDeleteForever color="#fff" size={20} />
						Cancelar
					</ButtonCancel>
				</div>
			</div>
			<img src={meetup.banner && meetup.banner.url} alt="" />
			<p>{meetup.description}</p>
			<div>
				<span>
					<MdEvent size={20} />
					{meetup.dateFormatted}
				</span>
				<span>
					<MdPlace size={20} />
					{meetup.location}
				</span>
			</div>
		</Container>
	);
}

Details.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
	}).isRequired,

	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
