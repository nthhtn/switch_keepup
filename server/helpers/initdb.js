import { Category, Device } from '../models';

module.exports = async () => {
	const categories = await Category.findAll({ raw: true });
	if (categories.length > 0) { return; }
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
};
