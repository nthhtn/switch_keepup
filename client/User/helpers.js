module.exports.differentDays = (date1, date2) => {
	const differentTime = Math.abs(date1 - date2);
	return Math.ceil(differentTime / (1000 * 60 * 60 * 24));
};
