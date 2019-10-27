import * as Yup from 'yup';
import { isBefore, parseISO, subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';

class MeetupController {
	async index(req, res) {
		const page = req.query.page || 1;
		const where = {};

		if (req.query.date) {
			const data = parseISO(req.query.date);

			where.data = {
				[Op.between]: [startOfDay(data), endOfDay(data)],
			};
		}

		const meetups = await Meetup.findAll({
			where,
			order: ['data'],
			include: [
				{ model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
				{ model: User, as: 'user', attributes: ['id', 'name', 'email'] },
				{ model: Subscription, as: 'subscription', attributes: ['id'] },
			],
			limit: 10,
			offset: (page - 1) * 10,
		});

		return res.json(meetups);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			description: Yup.string().required(),
			location: Yup.string().required(),
			data: Yup.date().required(),
			banner: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Erro de validação' });
		}

		const { title, description, location, data, banner: banner_id } = req.body;

		const fileExist = await File.findByPk(banner_id);

		if (!fileExist) {
			return res.status(400).json({ error: 'File not exists' });
		}

		if (!isBefore(new Date(), parseISO(data))) {
			return res
				.status(400)
				.json({ error: 'A data não pode ser antes da data atual' });
		}

		const meetup = await Meetup.create({
			title,
			description,
			location,
			data,
			banner_id,
			user_id: req.userId,
		});

		return res.json(meetup);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			title: Yup.string().required(),
			description: Yup.string().required(),
			location: Yup.string().required(),
			data: Yup.date().required(),
			banner: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Erro de validação' });
		}

		const { meetup: meetupId } = req.params;

		const meetup = await Meetup.findByPk(meetupId);
		if (!meetup) {
			return res.status(401).json({ error: 'Meetup não existe' });
		}

		if (meetup.user_id !== req.userId) {
			return res
				.status(401)
				.json({ error: 'Você não tem permissão para atualizar este meetup' });
		}

		const { data, banner: banner_id } = req.body;

		const fileExist = await File.findByPk(banner_id);

		if (!fileExist) {
			return res.status(400).json({ error: 'Arquivo não existe' });
		}

		if (meetup.past) {
			return res
				.status(400)
				.json({ error: 'Não é permitido atualizar meetups que já aconteceram' });
		}

		if (!isBefore(new Date(), parseISO(data))) {
			return res
				.status(400)
				.json({ error: 'A data não pode ser antes da data atual' });
		}

		meetup.update(req.body);

		return res.json(meetup);
	}

	async delete(req, res) {
		const { meetup: meetupId } = req.params;

		const meetup = await Meetup.findByPk(meetupId);
		if (!meetup) {
			return res.status(401).json({ error: 'Meetup não existe' });
		}

		if (meetup.user_id !== req.userId) {
			return res
				.status(401)
				.json({ error: 'Você não tem permissão para deletar este meetup' });
		}

		if (!isBefore(new Date(), meetup.data)) {
			return res
				.status(400)
				.json({ error: 'Você não pode deletar este meetup agora' });
		}

		await meetup.destroy();

		return res.json();
	}

	async show(req, res) {
		const { meetup: meetupId } = req.params;

		const meetup = await Meetup.findByPk(meetupId, {
			include: [
				{ model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
				{ model: User, as: 'user', attributes: ['id', 'name', 'email'] },
			],
		});
		if (!meetup) {
			return res.status(401).json({ error: 'Meetup não existe' });
		}

		if (meetup.user_id !== req.userId) {
			return res
				.status(401)
				.json({ error: 'Você não tem permissão para acessar este meetup' });
		}

		return res.json(meetup);
	}
}

export default new MeetupController();
