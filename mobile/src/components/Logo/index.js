import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

export default function Logo({ size, ...props }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 42 42" fill="none" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M35.143 0H41v42h-6.33V9.32L21.13 25.555h-1.165L6.298 9.32V42H0V0h5.92l14.643 17.257L35.143 0z"
				fill="#F94D6A"
			/>
		</Svg>
	);
}

Logo.propTypes = {
	size: PropTypes.number.isRequired,
};
