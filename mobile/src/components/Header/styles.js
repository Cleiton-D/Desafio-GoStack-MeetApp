import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import Logo from '~/components/Logo';

export const Container = styled.View`
	/* height: ${64 + StatusBar.currentHeight}px; */
	height: 94px;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.3);
`;

export const ILogo = styled(Logo)`
margin-top: 30px;
	/* margin-top: ${StatusBar.currentHeight}px; */
`;
