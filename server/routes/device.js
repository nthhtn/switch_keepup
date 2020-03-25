import express from 'express';
import { Device, Category, Calibration } from '../models';
import Sequelize, { Op } from 'sequelize';
import Promise from 'bluebird';

module.exports = (app) => {

	let router = express.Router();

	router.route('/')
		.post(async (req, res) => {
			try {
				const result = await Device.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.errors[0].message });
			}
		})
		.get(async (req, res) => {
			try {
				let result = await Device.findAll({
					include: [{ model: Category, attributes: ['id', 'name'] }],
					order: [['createdAt', 'DESC']], raw: true
				});
				await Promise.map(result, async (item, i) => {
					const lastCalibration = await Calibration.findAll({
						attributes: ['id', 'date'],
						where: { date: { [Op.lte]: Sequelize.fn('curdate') }, deviceId: item.id },
						include: [{ model: Device, attributes: ['id'] }],
						order: [['date', 'DESC']],
						limit: 1,
						raw: true
					});
					const nextCalibration = await Calibration.findAll({
						attributes: ['id', 'date'],
						where: { date: { [Op.gt]: Sequelize.fn('curdate') }, deviceId: item.id },
						include: [{ model: Device, attributes: ['id'] }],
						order: [['date', 'ASC']],
						limit: 1,
						raw: true
					});
					result[i] = { ...item, lastCalibration: lastCalibration[0], nextCalibration: nextCalibration[0] };
				});
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				await Device.update(req.body.data, { where: req.body.filter });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.errors[0].message });
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
				const result = await Device.update(req.body, { where: { id } });
				return res.json({ success: true });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	app.use('/api/devices', router);

};
