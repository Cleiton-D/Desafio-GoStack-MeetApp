import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { darken } from 'polished';

export const Container = styled.div`
	max-width: 900px;
	margin: 50px auto;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong {
			color: #fff;
			font-size: 32px;
			width: 100%;
		}

		div {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			button,
			a {
				border-radius: 4px;
				margin-left: 15px;
				display: flex;
				align-items: center;
				padding: 5px 15px;
				color: #fff;
				font-weight: bold;
				border: 0;
				transition: background 0.2s;

				svg {
					margin-right: 5px;
				}
			}
		}
	}

	img {
		margin-top: 40px;
		width: 100%;
		height: 300px;
	}

	p {
		margin-top: 15px;
		text-align: justify;
		font-size: 18px;
		line-height: 32px;
		color: #fff;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 10px;

		span {
			display: flex;
			align-items: center;
			color: rgba(255, 255, 255, 0.6);
			margin-right: 25px;

			svg {
				margin-right: 5px;
			}
		}
	}
`;

export const ButtonEdit = styled(Link)`
	background: #4dbaf9;

	&:hover {
		background: ${darken(0.1, '#4dbaf9')};
	}
`;

export const ButtonCancel = styled.button`
	background: #d44059;

	&:hover {
		background: ${darken(0.04, '#d44059')};
	}
`;

export const AlertContainer = styled.div`
	padding: 10px 15px;
	height: 150px;
	width: 300px;
	background: ${darken(0.1, '#402845')};
	border-radius: 7px;
	color: #fff;
	display: flex;
	flex-direction: column;

	strong {
		font-size: 22px;
	}

	hr {
		border: 0;
		height: 1px;
		background: rgba(255, 255, 255, 0.2);
		margin: 10px 0 15px;
	}

	p {
		font-size: 16px;
	}
	div {
		margin-top: 5px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex: 1;

		button {
			color: #fff;
			font-weight: bold;
			border: 0;
			background: blue;
			margin-left: 5px;
			padding: 10px 15px;
			border-radius: 4px;
			transition: opacity 0.2s;

			&:hover {
				opacity: 0.8;
			}
		}
	}
`;
