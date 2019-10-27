import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

import Meetup from '../models/Meetup';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
	async index(req, res) {
		const meetups = await Subscription.findAll({
			where: { user_id: req.userId },
			include: [
				{
					model: Meetup,
					as: 'meetup',
					where: { data: { [Op.gt]: new Date() } },
					attributes: ['title', 'description', 'location', 'data'],
					include: [
						{ model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
						{ model: User, as: 'user', attributes: ['id', 'name', 'email'] },
					],
				},
			],
			attributes: ['id'],
			order: [['meetup', 'data']],
		});

		return res.json(meetups);
	}

	async store(req, res) {
		const { meetup_id } = req.body;
		const { userId } = req;

		const meetup = await Meetup.findByPk(meetup_id, {
			include: [{ model: File, as: 'banner', attributes: ['id', 'path', 'url'] }],
		});
		if (!meetup) {
			return res.status(400).json({ error: 'Meetup não existe' });
		}

		if (meetup.user_id === userId) {
			return res
				.status(401)
				.json({ error: 'Você não pode se inscrever neste meetup' });
		}

		if (!isBefore(new Date(), meetup.data)) {
			return res
				.status(400)
				.json({ error: 'Você não pode se increver em meetups que já passaram' });
		}

		const userSubscribe = await Subscription.findOne({
			where: { meetup_id, user_id: userId },
		});
		if (userSubscribe) {
			return res
				.status(400)
				.json({ error: 'Você já está inscrito neste meetup!' });
		}

		const hourBusy = await Subscription.findOne({
			where: { user_id: userId },
			include: [
				{
					model: Meetup,
					as: 'meetup',
					where: {
						data: meetup.data,
					},
					attributes: ['id', 'data'],
				},
			],
		});

		if (hourBusy) {
			return res
				.status(400)
				.json({ error: 'Você já está incrito em um Meetup no mesmo horário' });
		}

		const subscription = await Subscription.create({
			user_id: req.userId,
			meetup_id: req.body.meetup_id,
		});

		const user = await User.findByPk(req.userId, {
			attributes: ['name', 'email'],
		});

		Queue.add(SubscriptionMail.key, { meetup, user });

		return res.json(subscription);
	}

	async delete(req, res) {
		const { subscription: subscriptionId } = req.params;

		const subscription = await Subscription.findByPk(subscriptionId);

		// , {
		// 	include: [
		// 		{
		// 			model: Meetup,
		// 			as: 'meetup',
		// 			attributes: ['id', 'data'],
		// 		},
		// 	],
		// }

		if (subscription) {
			const meetup = await Meetup.findByPk(subscription.meetup_id);
			if (!meetup) {
				return res.status(400).json({ error: 'Meetup não existe' });
			}

			if (!isBefore(new Date(), meetup.data)) {
				return res.status(400).json({
					error: 'Você não pode cancelar a inscrição de meetups que já passaram',
				});
			}

			await subscription.destroy();
		}
		return res.json({ message: 'Inscrição cancelada com sucesso' });
	}
}

export default new SubscriptionController();
