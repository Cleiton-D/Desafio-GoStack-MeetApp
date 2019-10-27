import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import { resolve } from 'path';

import config from '../config/mailer';

class Mail {
	constructor() {
		const { host, port, secure, auth } = config;

		this.transponder = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: auth.user ? auth : null,
		});

		this.configureMail();
	}

	configureMail() {
		const viewPath = resolve(__dirname, '..', 'app', 'views', 'email');
		this.transponder.use(
			'compile',
			nodemailerhbs({
				viewEngine: exphbs.create({
					layoutsDir: resolve(viewPath, 'layouts'),
					partialsDir: resolve(viewPath, 'partials'),
					defaultLayout: 'default',
					extname: '.hbs',
				}),
				viewPath,
				extName: '.hbs',
			})
		);
	}

	sendMail(message) {
		return this.transponder.sendMail({
			...config.default,
			...message,
		});
	}
}

export default new Mail();
