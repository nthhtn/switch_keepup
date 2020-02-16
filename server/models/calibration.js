module.exports = (sequelize, DataTypes) => {

	const Calibration = sequelize.define('Calibration', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		document: DataTypes.STRING,
		status: DataTypes.STRING
	});

	Calibration.associate = (models) => {
		models.Calibration.belongsTo(models.Device, {
			foreignKey: 'deviceId',
			onDelete: 'CASCADE'
		});
	};

	return Calibration;

};
