import express from 'express';
import path from 'path';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { hashPassword } from '../../helpers/password';
import { User } from '../../models';

module.exports = (app) => {

	let router = express.Router();

	passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
		const user = await User.findOne({ where: { email }, raw: true });
		if (!user || user.password !== hashPassword(password, user.salt)) {
			return done(null, false, { success: false, error: 'Mismatched username/password' });
		}
		return done(null, user);
	}));

	router.route('/login')
		.get(async (req, res) => {
			return res.sendFile(path.resolve(`${__dirname}/../../views/guest.html`));
		})
		.post((req, res) => {
			passport.authenticate('local', (err, user, info) => {
				if (err) { return res.status(500).json({ success: false, error: err.message }); }
				if (!user) { return res.status(401).json(info); }
				req.login(user, (err) => {
					if (err) { return res.status(500).json({ success: false, error: err.message }); }
					return res.json({ success: true });
				});
			})(req, res);
		});

	app.use('/', router);

};
