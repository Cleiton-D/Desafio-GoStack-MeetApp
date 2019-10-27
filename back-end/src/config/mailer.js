export default {
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: false, // SSL
	auth: {
		// autenticação do email
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	default: {
		// configuração para todo email enviado
		from: 'Kiper Meetups <noreply@meetups.com>',
	},
};
