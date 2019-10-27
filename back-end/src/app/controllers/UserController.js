import * as Yup from 'yup';

import User from '../models/User';

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			password: Yup.string()
				.required()
				.min(8),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Erro de validação' });
		}

		const userExist = await User.findOne({ where: { email: req.body.email } });

		if (userExist) {
			return res.status(401).json({ error: 'usuário já existe' });
		}

		const { name, email } = await User.create(req.body);
		return res.json({ name, email });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(8),
			password: Yup.string()
				.min(8)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'erro de validação' });
		}

		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if (email !== user.email) {
			const userExist = await User.findOne({ where: { email } });

			if (userExist) {
				return res.status(400).json({ error: 'usuario já existe' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'senha inválida' });
		}

		const { name } = await user.update(req.body);

		return res.json({ name, email });
	}
}

export default new UserController();
