import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
	background: rgba(0, 0, 0, 0.3);
	padding: 0 30px;
`;

export const Content = styled.div`
	height: 92px;
	max-width: 900px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	aside {
		display: flex;
		align-items: center;

		div {
			display: flex;
			flex-direction: column;
			text-align: right;
			margin-right: 20px;

			strong {
				color: #fff;
				font-size: 14px;
				line-height: 16px;
			}

			a {
				margin-top: 2px;
				color: #999;
				font-size: 14px;
			}
		}
		button {
			border: 0;
			background-color: #d44059;
			color: #fff;
			font-weight: bold;
			padding: 10px 17px;
			border-radius: 4px;
			transition: background 0.2s;

			&:hover {
				background: ${darken(0.04, '#d44059')};
			}
		}
	}
`;
