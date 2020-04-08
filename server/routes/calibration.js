import express from 'express';
import { Calibration, Device } from '../models';

module.exports = (app) => {

	let router = express.Router();

	router.route('/')
		.post(async (req, res) => {
			try {
				const result = await Calibration.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.errors[0].message });
			}
		})
		.get(async (req, res) => {
			try {
				let result = await Calibration.findAll({
					include: [{ model: Device, attributes: ['id', 'name'] }],
					order: [['createdAt', 'DESC']], raw: true
				});
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			try {
				await Calibration.destroy({ where: req.body });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.put(async (req, res) => {
			const { id } = req.params;
			try {
				const result = await Calibration.update(req.body, { where: { id } });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	app.use('/api/calibrations', router);

};
