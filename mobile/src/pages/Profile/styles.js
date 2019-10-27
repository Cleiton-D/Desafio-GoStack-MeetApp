import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
	padding: 20px;
`;

export const Form = styled.View`
	align-self: stretch;
	margin-top: 50px;
`;

export const FormInput = styled(Input)`
	margin-bottom: 10px;
`;

export const Separator = styled.View`
	height: 1px;
	background: rgba(255, 255, 255, 0.1);
	margin-top: 30px;
	margin-bottom: 20px;
`;

export const SButton = styled(Button)`
	margin-top: 5px;
	margin-bottom: 15px;
`;
