import path from 'path';
import { isLoggedIn } from '../helpers/middleware';

module.exports = (app) => {

	require('./guest')(app);

	app.use('/api', isLoggedIn);
	require('./device')(app);
	require('./category')(app);
	require('./user')(app);
	require('./department')(app);

	app.route('/logout')
		.get((req, res) => {
			if (req.isAuthenticated()) { req.logOut(); }
			return res.sendFile(path.resolve(`${__dirname}/../views/guest.html`));
		});

	app.route('*')
		.get((req, res) => {
			const viewpath = req.isAuthenticated() ? `${__dirname}/../views/user.html` : `${__dirname}/../views/guest.html`;
			res.sendFile(path.resolve(viewpath));
		});

};
