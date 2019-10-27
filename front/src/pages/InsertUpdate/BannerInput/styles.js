import styled from 'styled-components';

export const Container = styled.div`
	align-self: center;
	margin-bottom: 30px;
	width: 100%;
	height: 300px;

	label {
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		img {
			height: 100%;
			width: 100%;
		}

		div {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background: rgba(0, 0, 0, 0.2);
			color: rgba(255, 255, 255, 0.3);
		}

		input {
			display: none;
		}
	}
`;
