import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
	background: #fff;
	margin-bottom: 20px;
	border-radius: 4px;
`;

export const Banner = styled.Image.attrs({
	resizeMode: 'stretch',
})`
	height: 150px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	margin-bottom: 20px;
`;

export const Info = styled.View`
	padding: 0 20px 20px 20px;
`;

export const Title = styled.Text`
	color: #333;
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const InfoItem = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const InfoItemText = styled.Text`
	color: #999;
	margin-left: 5px;
`;

export const ButtonSubscribe = styled(Button)`
	margin-top: 15px;
	opacity: ${props => (props.enabled ? 1 : 0.6)};
`;
