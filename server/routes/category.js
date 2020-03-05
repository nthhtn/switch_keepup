import express from 'express';
import { Category } from '../models';

module.exports = (app) => {

	let router = express.Router();

	router.route('/')
		.post(async (req, res) => {
			try {
				const result = await Category.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await Category.findAll({ order: [['createdAt', 'ASC']], raw: true });
				return res.json({ success: true, result });
			} catch (error) {
				return res.json({ success: false, error: error.message });
			}
		});

	app.use('/api/categories', router);

};
