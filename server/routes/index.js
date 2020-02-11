import path from 'path';

module.exports = (app) => {

	app.route('*')
		.get((req, res) => {
			res.sendFile(path.resolve(`${__dirname}/../views/user.html`));
		});

};
