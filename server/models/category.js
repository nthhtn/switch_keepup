module.exports = (sequelize, DataTypes) => {

	const Category = sequelize.define('Category', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		description: DataTypes.STRING
	});

	return Category;

};
