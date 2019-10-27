import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import App from './App';

import { store, persistor } from '~/store';

export default function src() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="transparent"
				/>
				<App />
			</PersistGate>
		</Provider>
	);
}
