module.exports = (sequelize, DataTypes) => {

	const Device = sequelize.define('Device', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		serialNo: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		calibrationPeriod: DataTypes.INTEGER,
		location: DataTypes.STRING,
		seller: DataTypes.STRING,
		servicePartner: DataTypes.STRING,
		deviceFunction: DataTypes.STRING,
		quantity: DataTypes.INTEGER,
		status: DataTypes.STRING,
		comment: DataTypes.STRING
	});

	Device.associate = (models) => {
		models.Device.belongsTo(models.User, {
			foreignKey: 'addedBy',
			onDelete: 'CASCADE'
		});
		models.Device.belongsTo(models.Category, {
			foreignKey: 'categoryId',
			onDelete: 'CASCADE'
		});
		models.Device.belongsTo(models.Department, {
			foreignKey: 'departmentId',
			onDelete: 'CASCADE'
		});
	};

	return Device;

};
