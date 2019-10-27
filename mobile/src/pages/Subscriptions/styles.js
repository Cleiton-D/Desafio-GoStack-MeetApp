import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 0 30px;
`;

export const MeetupList = styled.FlatList.attrs({
	showsVerticalScrollIndicator: false,
})`
	margin-top: 20px;
	width: 100%;
`;
