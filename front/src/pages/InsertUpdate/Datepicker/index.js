import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import { setHours, setMinutes, getDate } from 'date-fns';
import pt from 'date-fns/locale/pt';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function DatePicker(props) {
	const ref = useRef(null);
	const { registerField, defaultValue, error } = useField('data');
	const [selected, setSelected] = useState(defaultValue);

	useEffect(() => {
		registerField({
			name: 'data',
			ref: ref.current,
			path: 'props.selected',
			clearValue: pickerRef => {
				pickerRef.clear();
			},
		});
		console.tron.log(defaultValue);
	}, [ref.current]); // eslint-disable-line

	const ConteinerCalendar = ({ children }) => {
		// console.tron.log(children);
		return (
			<Container className="teste">
				<CalendarContainer>
					<div style={{ position: 'relative', color: '#fff' }}>{children}</div>
				</CalendarContainer>
			</Container>
		);
	};
	ConteinerCalendar.propTypes = {
		children: PropTypes.arrayOf(PropTypes.shape).isRequired,
	};

	const renderDayContents = (_, date) => {
		return <span>{getDate(date)}</span>;
	};

	return (
		<>
			<ReactDatePicker
				name="data"
				selected={selected}
				showTimeSelect
				onChange={date => setSelected(date)}
				ref={ref}
				locale={pt}
				dateFormat="dd/MM/yyyy HH:mm"
				minTime={setHours(setMinutes(new Date(), 0), 9)}
				maxTime={setHours(setMinutes(new Date(), 0), 22)}
				calendarContainer={ConteinerCalendar}
				renderDayContents={renderDayContents}
				{...props}
			/>
			{error && <span>{error}</span>}
		</>
	);
}
