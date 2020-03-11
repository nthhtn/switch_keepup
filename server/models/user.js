module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return User;

};
