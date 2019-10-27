import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 0 30px;
`;

export const DateSelector = styled.View`
	margin-top: 30px;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const DateText = styled.Text`
	margin: 0 15px;
	font-size: 20px;
	font-weight: bold;
	color: #fff;
`;

export const MeetupList = styled.FlatList.attrs({
	showsVerticalScrollIndicator: false,
})`
	margin-top: 30px;
	width: 100%;
`;
