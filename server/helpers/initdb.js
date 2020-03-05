import { Category, Device } from '../models';

module.exports = async () => {
	const categories = await Category.findAll({ raw: true });
	if (categories.length === 0) {
		const listCategory = [
			{ id: 'Y01', name: 'Production Measurement' },
			{ id: 'Y02', name: 'Production Tools' },
			{ id: 'Y03', name: 'Laboratory Measurement' },
			{ id: 'Y04', name: 'Laboratory Tools' },
			{ id: 'Y05', name: 'HPC Measurement' },
			{ id: 'Y06', name: 'HPC Tools' },
			{ id: 'Y07', name: 'R&D Measurement' },
			{ id: 'Y08', name: 'R&D Tools' },
			{ id: 'Y09', name: 'Lifting Equipment' },
			{ id: 'Y10', name: 'Facility / MISC' },
			{ id: 'Y11', name: 'Fixed Assets' }
		];
		await Category.bulkCreate(listCategory);
	}
	const devices = await Device.findAll({ raw: true });
	if (devices.length === 0) {
		const listDevice = new Array(20).fill(1).map((item, i) => {
			const random = Math.floor(Math.random() * 11) + 1;
			return {
				id: 'DE' + (i + 1).toString(),
				name: 'Device ' + (i + 1).toString(),
				serialNo: 'SN' + (i + 1).toString(),
				calibrationPeriod: 1,
				location: random % 2 === 0 ? 'Vaasa' : 'Lappeenranta',
				categoryId: random < 10 ? 'Y0' + random : 'Y' + random
			};
		});
		await Device.bulkCreate(listDevice);
	}
};
