import React from 'react';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
	Container,
	Banner,
	Title,
	Info,
	InfoItem,
	InfoItemText,
	ButtonSubscribe,
} from './styles';

export default function Meetup({ data, onClick, buttonLabel, disabledButton }) {
	return (
		<Container>
			<Banner source={{ uri: data.banner.url }} />
			<Info>
				<Title>{data.title}</Title>
				<InfoItem>
					<Icon name="event" color="#999" size={14} />
					<InfoItemText>{data.dateFormatted}</InfoItemText>
				</InfoItem>
				<InfoItem>
					<Icon name="place" color="#999" size={14} />
					<InfoItemText>{data.location}</InfoItemText>
				</InfoItem>
				<InfoItem>
					<Icon name="person" color="#999" size={14} />
					<InfoItemText>Organizador: {data.user.name}</InfoItemText>
				</InfoItem>
				<ButtonSubscribe enabled={!disabledButton} onPress={onClick}>
					{buttonLabel}
				</ButtonSubscribe>
			</Info>
		</Container>
	);
}

Meetup.propTypes = {
	data: PropTypes.shape({
		banner: PropTypes.shape({
			url: PropTypes.string.isRequired,
		}),

		title: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		dateFormatted: PropTypes.string.isRequired,

		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,

	onClick: PropTypes.func,
	buttonLabel: PropTypes.string,
	disabledButton: PropTypes.bool,
};

Meetup.defaultProps = {
	onClick: () => {},
	buttonLabel: 'Enviar',
	disabledButton: false,
};
