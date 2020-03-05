import path from 'path';

module.exports = (app) => {

	require('./device')(app);
	require('./category')(app);

	app.route('*')
		.get((req, res) => {
			res.sendFile(path.resolve(`${__dirname}/../views/user.html`));
		});

};
