import express from 'express';
import { Device, Category, Calibration, Department } from '../models';
import Sequelize, { Op } from 'sequelize';
import Promise from 'bluebird';
import { flatten } from '../helpers/flatten';

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
					include: [{ model: Category, attributes: ['id', 'name'] }, { model: Department, attributes: ['id', 'name'] }],
					order: [['createdAt', 'DESC']], raw: true
				});
				await Promise.map(result, async (item, i) => {
					let lastCalibration = await Calibration.findAll({
						attributes: ['id', 'date'],
						where: { date: { [Op.lte]: Sequelize.fn('curdate') }, deviceId: item.id },
						include: [{ model: Device, attributes: ['id'] }],
						order: [['date', 'DESC']],
						limit: 1,
						raw: true
					});
					lastCalibration = { id: '', date: '', ...lastCalibration[0] };
					let nextCalibration = await Calibration.findAll({
						attributes: ['id', 'date'],
						where: { date: { [Op.gt]: Sequelize.fn('curdate') }, deviceId: item.id },
						include: [{ model: Device, attributes: ['id'] }],
						order: [['date', 'ASC']],
						limit: 1,
						raw: true
					});
					nextCalibration = { id: '', date: '', ...nextCalibration[0] };
					result[i] = flatten({ ...item, lastCalibration, nextCalibration });
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

	router.route('/search')
		.get(async (req, res) => {
			try {
				const result = await Device.findAll({
					attributes: ['id', 'name'],
					where: { name: { [Op.like]: `%${req.query.q}%` } },
					raw: true
				});
				return res.json({ success: true, result });
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
