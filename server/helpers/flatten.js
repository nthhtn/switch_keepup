function traverseAndFlatten(currentNode, target, flattenedKey) {
	for (let key in currentNode) {
		if (currentNode.hasOwnProperty(key)) {
			const newKey = flattenedKey === undefined ? key : flattenedKey + '.' + key;
			const value = currentNode[key];
			if (typeof value === "object") {
				traverseAndFlatten(value, target, newKey);
			} else {
				target[newKey] = value;
			}
		}
	}
};

module.exports.flatten = (obj) => {
	let flattenedObject = {};
	traverseAndFlatten(obj, flattenedObject);
	return flattenedObject;
};
