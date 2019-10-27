import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import { HOST } from '~/env';

if (__DEV__) {
	const tron = Reactotron.configure({
		host: HOST,
	})
		.useReactNative()
		.use(reactotronRedux())
		.use(reactotronSaga())
		.connect();

	console.tron = tron;
}
