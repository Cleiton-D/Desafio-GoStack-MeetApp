import Mail from '../../lib/Mail';

class SubscriptionMail {
	get key() {
		return 'SubscriptionMail';
	}

	async handle({ data }) {
		const { meetup, user } = data;

		await Mail.sendMail({
			to: `${user.name} <${user.email}>`,
			subject: `Nova inscrição no Meetup ${meetup.title}`,
			template: 'subscription',
			context: {
				meetup: meetup.title,
				user: meetup.user.name,
				banner: meetup.banner.url,
				registered: user.name,
				email: user.email,
			},
		});
	}
}

export default new SubscriptionMail();
