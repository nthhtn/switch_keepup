module.exports = (sequelize, DataTypes) => {

	const Department = sequelize.define('Department', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		description: DataTypes.STRING
	});

	Department.associate = (models) => {
		models.Department.hasMany(models.Device, { foreignKey: 'departmentId' });
	};

	return Department;

};
