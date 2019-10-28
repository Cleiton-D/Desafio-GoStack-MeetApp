import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import { Container, Load } from './styles';

import BannerInput from './BannerInput';
import Datepicker from './Datepicker';

import api from '~/services/api';

const schema = Yup.object().shape({
	banner_id: Yup.number().required('O banner é obrigatório!'),
	title: Yup.string().required('O titulo é obrigatório!'),
	description: Yup.string().required('A descrição é obrigatória!'),
	data: Yup.date()
		.required('A data é obrigatória!')
		.typeError('Insira uma data válida!'),
	location: Yup.string().required('A localização é obrigatória!'),
});

export default function InsertUpdate({ match, history }) {
	const [meetup, setMeetup] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadMeetup() {
			const { id } = match.params;

			if (id) {
				const response = await api.get(`/meetups/${id}`);
				const data = {
					...response.data,
					data: parseISO(response.data.data),
				};

				setMeetup(data);
			}
			setLoading(false);
		}

		loadMeetup();
	}, []); // eslint-disable-line

	async function saveMeetup(data) {
		try {
			const response = await api.post('meetups', data);
			toast.success('Meetup salva com sucesso!');
			history.push(`/details/${response.data.id}`);
		} catch (err) {
			toast.error('Falha ao salvar a meetup, verifique os dados!');
		}
	}

	async function updateMeetup(id, data) {
		try {
			await api.put(`meetups/${id}`, data);
			toast.success('Meetup alterada com sucesso!');
			history.push(`/details/${id}`);
		} catch (err) {
			console.log(err);
			toast.error('Falha ao atualizar meetup, verifique os dados!');
		}
	}

	function handleSubmit({
		title,
		description,
		data,
		location,
		banner_id: banner,
	}) {
		const { id } = match.params;
		if (id) {
			updateMeetup(id, { title, description, data, location, banner });
		} else {
			saveMeetup({ title, description, data, location, banner });
		}
	}

	return (
		<Container>
			{loading ? (
				<Load type="ThreeDots" />
			) : (
				<Form onSubmit={handleSubmit} initialData={meetup} schema={schema}>
					<BannerInput name="banner_id"  />
					<Input name="title" placeholder="Titulo do Meetup" />
					<Textarea maxLength="255" name="description" placeholder="Descrição completa" />
					<Datepicker name="data" placeholderText="data do meetup" />
					<Input name="location" placeholder="Localização" />
					<button type="submit">
						<MdAddCircleOutline color="#fff" size={20} />
						Salvar meetup
					</button>
				</Form>
			)}
		</Container>
	);
}

InsertUpdate.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }).isRequired,
	}).isRequired,
};
