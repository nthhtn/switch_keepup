require('dotenv').config();

module.exports = {
	name: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	host: process.env.DB_HOST
};
