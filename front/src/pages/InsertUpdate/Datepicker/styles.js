import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
	background: none;

	div {
		color: #fff !important;
		background: ${darken(0.1, '#402845')};
		overflow: hidden;
	}

	li {
		color: #fb6f91;

		&:hover {
			background: rgba(255, 255, 255, 0.3) !important;
		}
	}
	.react-datepicker__triangle {
		background: none;
		border-top-color: ${darken(0.1, '#402845')} !important;
	}

	/* .react-datepicker__triangle ~ div div {
		color: #fff !important;
		background: ${darken(0.1, '#402845')};
	} */

	.react-datepicker__day:hover {
		background: rgba(255, 255, 255, 0.3);
	}
`;
