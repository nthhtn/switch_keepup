export function createCalibration(calibration, callback) {
	return async (dispatch) => {
		const response = await fetch(`/api/calibrations`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(calibration)
		}).catch((error) => callback(error));
		const responseJson = await response.json();
		if (responseJson.success) {
			dispatch(createCalibrationSuccess(responseJson.result));
			return callback(null);
		}
		return callback(new Error(responseJson.error));
	};
};

export function createCalibrationSuccess(calibration) {
	return { type: 'CREATE_CALIBRATION', calibration };
};

export function listCalibration(page = 1, limit = 10) {
	return async (dispatch) => {
		const response = await fetch(`/api/calibrations`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listCalibrationSuccess(responseJson.result));
	};
};

export function listCalibrationSuccess(list) {
	return { type: 'LIST_CALIBRATION', list };
};

export function updateCalibration(id, data) {
	return async (dispatch) => {
		const response = await fetch(`/api/calibrations/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const responseJson = await response.json();
		dispatch(updateCalibrationSuccess(id, data));
	};
}

export function updateCalibrationSuccess(id, data) {
	return { type: 'UPDATE_CALIBRATION', id, data };
}

export function deleteManyCalibrations(filter) {
	return async (dispatch) => {
		const response = await fetch(`/api/calibrations`, {
			credentials: 'same-origin',
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter)
		});
		const responseJson = await response.json();
		dispatch(deleteManyCalibrationsSuccess(filter));
	};
}

export function deleteManyCalibrationsSuccess(filter) {
	return { type: 'DELETE_MANY_CALIBRATIONS', filter };
}
