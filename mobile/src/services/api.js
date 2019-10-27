import axios from 'axios';

import { HOST } from '~/env';

const api = axios.create({
	baseURL: `http://${HOST}:3333`,
});

export default api;
