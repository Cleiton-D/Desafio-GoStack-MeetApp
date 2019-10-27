import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
	max-width: 900px;
	margin: 50px auto;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	> span {
		font-size: 32px;
		color: #fff;
		font-weight: bold;
	}

	a {
		border: 0;
		background: #f94d6a;
		display: flex;
		align-items: center;
		padding: 8px 15px;
		border-radius: 4px;
		transition: background 0.2s;

		span {
			margin-left: 5px;
			color: #fff;
			font-weight: bold;
		}

		&:hover {
			background: ${darken(0.04, '#f94d6a')};
		}
	}
`;

export const ListMeetups = styled.ul`
	margin: 50px 0;
	display: grid;
	grid-gap: 15px;

	li {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;

		a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20px 25px;

			> span {
				color: #fff;
				font-size: 18px;
				font-weight: bold;
			}

			div {
				display: flex;
				align-items: center;

				span {
					font-size: 16px;
					color: rgba(255, 255, 255, 0.6);
					margin-right: 15px;
				}
			}
		}

		svg {
			transition: right 0.2s;
			position: relative;
			right: 0;
		}

		&:hover {
			cursor: pointer;

			svg {
				right: -5px;
			}
		}
	}
`;
