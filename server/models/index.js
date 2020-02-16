import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { name, user, password, host } from '../../config/db';

const options = {
	host,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
};
const sequelize = new Sequelize(name, user, password, options);
const basename = path.basename(__filename);
var db = Object.assign({});

fs.readdirSync(__dirname)
	.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) { db[modelName].associate(db); }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
