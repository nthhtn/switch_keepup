import express from 'express';
import { User } from '../models';
import { hashPassword, generateSalt } from '../helpers/password';

module.exports = (app) => {

	let router = express.Router();

	router.route('/')
		.post(async (req, res) => {
			try {
				const password = '123456';
				const salt = generateSalt();
				const hashedPassword = hashPassword(password, salt);
				const result = await User.create({ ...req.body, salt, password: hashedPassword });
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.errors[0].message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await User.findAll({ order: [['createdAt', 'DESC']], raw: true });
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			try {
				await User.destroy({ where: req.body });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	router.route('/me')
		.get(async (req, res) => {
			try {
				const { id, fullname, email, role } = req.user;
				const result = { id, fullname, email, role };
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			const { fullname, oldpass, newpass } = req.body;
			const { id, password, salt } = req.user;
			let data = { fullname };
			if (oldpass) {
				const hashedOldPass = hashPassword(oldpass, salt);
				if (hashedOldPass !== password) {
					return res.json({ success: false, error: 'Wrong current password' });
				}
				if (newpass) {
					const hashedNewPass = hashPassword(newpass, salt);
					data.password = hashedNewPass;
				}
			}
			try {
				await User.update(data, { where: { id } });
				req.login({ ...req.user, ...data }, (err) => {
					if (err) { return res.status(500).json({ success: false, error: err.message }); }
					return res.json({ success: true });
				});
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.put(async (req, res) => {
			const { id } = req.params;
			try {
				await User.update(req.body, { where: { id } });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	app.use('/api/users', router);

};
