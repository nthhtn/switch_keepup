import express from 'express';
import { Device, Category } from '../models';

module.exports = (app) => {

	let router = express.Router();

	router.route('/')
		.post(async (req, res) => {
			try {
				const result = await Device.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await Device.findAll({
					include: [Category],
					order: [['createdAt', 'DESC']], raw: true
				});
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			try {
				await Device.destroy({ where: req.body });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.put(async (req, res) => {
			const { id } = req.params;
			try {
				await Device.update(req.body, { where: { id } });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	app.use('/api/devices', router);

};
