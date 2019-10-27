import styled from 'styled-components';

import { darken } from 'polished';

import Loader from 'react-loader-spinner';

export const Container = styled.div`
	max-width: 900px;
	margin: 50px auto;

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		input,
		textarea {
			background: rgba(0, 0, 0, 0.1);
			border: 0;
			border-radius: 4px;
			height: 44px;
			padding: 0 15px;
			color: #fff;
			margin: 0 0 10px;

			&::placeholder {
				color: rgba(255, 255, 255, 0.7);
			}
		}

		textarea {
			padding-top: 15px;
			font-family: 'Roboto', Arial, Helvetica, sans-serif;
			font-size: 15px;
			height: 200px;
		}

		span {
			color: #fb6f91;
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}

		> button {
			display: flex;
			align-items: center;
			justify-content: center;
			align-self: flex-end;
			padding: 10px;
			width: 180px;
			background: #f94d6a;
			font-weight: bold;
			color: #fff;
			border: 0;
			border-radius: 4px;
			font-size: 16px;
			transition: background 0.2s;

			svg {
				margin-right: 8px;
			}

			&:hover {
				background: ${darken(0.04, '#F94D6A')};
			}
		}

		a {
			color: #fff;
			margin-top: 15px;
			font-size: 16px;
			opacity: 0.8;

			&:hover {
				opacity: 1;
			}
		}
	}
`;

export const Load = styled(Loader).attrs({
	color: '#f94d6a',
	width: 164,
	height: 164,
})`
	display: flex;
	justify-content: center;
	align-items: center;
`;
