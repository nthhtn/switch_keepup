export function createDevice(device) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(device)
		});
		const responseJson = await response.json();
		dispatch(createDeviceSuccess(responseJson.result));
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

export function deleteDevice(id) {
	return async (dispatch) => {
		const response = await fetch(`/api/devices/${id}`, {
			credentials: 'same-origin',
			method: 'delete'
		});
		const responseJson = await response.json();
		dispatch(deleteDeviceSuccess(id));
	};
}

export function deleteDeviceSuccess(id) {
	return { type: 'DELETE_DEVICE', id };
}
