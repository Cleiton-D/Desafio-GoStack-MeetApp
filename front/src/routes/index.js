import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Profile from '~/pages/Profile';
import Details from '~/pages/Details';
import InserUpdate from '~/pages/InsertUpdate';
import Dashboard from '~/pages/Dashboard';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/profile" component={Profile} isPrivate />
			<Route path="/details/:id" component={Details} isPrivate />
			<Route path="/new" component={InserUpdate} isPrivate />
			<Route path="/edit/:id" component={InserUpdate} isPrivate />
			<Route path="/dashboard" component={Dashboard} isPrivate />
		</Switch>
	);
}
