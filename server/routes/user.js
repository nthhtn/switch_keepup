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
				return res.json({ success: false, error: error.message });
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
