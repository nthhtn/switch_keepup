import path from 'path';

module.exports = (app) => {

	require('./guest')(app);

	require('./device')(app);
	require('./category')(app);

	app.route('/logout')
		.get((req, res) => {
			return req.session.destroy(() => res.sendFile(path.resolve(`${__dirname}/../views/guest.html`)));
		});

	app.route('*')
		.get((req, res) => {
			const viewpath = req.isAuthenticated() ? `${__dirname}/../views/user.html` : `${__dirname}/../views/guest.html`;
			res.sendFile(path.resolve(viewpath));
		});

};
