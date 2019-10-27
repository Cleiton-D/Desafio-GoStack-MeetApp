import { Router } from 'express';

import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';

import multerConfig from './config/multer';

import auth from './app/midlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/meetups', MeetupController.store);
routes.post('/subscriptions', SubscriptionController.store);

routes.put('/users', UserController.update);
routes.put('/meetups/:meetup', MeetupController.update);

routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:meetup', MeetupController.show);
routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.delete('/meetups/:meetup', MeetupController.delete);
routes.delete('/subscriptions/:subscription', SubscriptionController.delete);

export default routes;
