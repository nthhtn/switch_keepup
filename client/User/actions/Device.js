export function createDevice(device, callback) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(device)
		}).catch((error) => callback(error));
		const responseJson = await response.json();
		if (responseJson.success) {
			dispatch(createDeviceSuccess(responseJson.result));
			return callback(null);
		}
		return callback(new Error(responseJson.error));
	};
};

export function createDeviceSuccess(device) {
	return { type: 'CREATE_DEVICE', device };
};

export function listDevice(page = 1, limit = 10) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listDeviceSuccess(responseJson.result));
	};
};

export function listDeviceSuccess(list) {
	return { type: 'LIST_DEVICE', list };
};

export function updateDevice(id, data) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const responseJson = await response.json();
		dispatch(updateDeviceSuccess(id, data));
	};
}

export function updateDeviceSuccess(id, data) {
	return { type: 'UPDATE_DEVICE', id, data };
}

export function updateManyDevices(filter, data) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ filter, data })
		});
		const responseJson = await response.json();
		dispatch(updateManyDevicesSuccess(filter, data));
	};
}

export function updateManyDevicesSuccess(filter, data) {
	return { type: 'UPDATE_MANY_DEVICES', filter, data };
}

export function deleteManyDevices(filter) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices`, {
			credentials: 'same-origin',
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter)
		});
		const responseJson = await response.json();
		dispatch(deleteManyDevicesSuccess(filter));
	};
}

export function deleteManyDevicesSuccess(filter) {
	return { type: 'DELETE_MANY_DEVICES', filter };
}
