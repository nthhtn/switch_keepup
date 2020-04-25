export function createDepartment(department, callback) {
	return async (dispatch) => {
		const response = await fetch(`/api/departments`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(department)
		});
		const responseJson = await response.json();
		if (responseJson.success) {
			dispatch(createDepartmentSuccess(responseJson.result));
			return callback(null);
		}
		return callback(responseJson.error);
	};
};

export function createDepartmentSuccess(department) {
	return { type: 'CREATE_DEPARTMENT', department };
};

export function listDepartment() {
	return async (dispatch) => {
		const response = await fetch(`/api/departments`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listDepartmentSuccess(responseJson.result));
	};
};

export function listDepartmentSuccess(list) {
	return { type: 'LIST_DEPARTMENT', list };
};

export function updateDepartment(id, data) {
	return async (dispatch) => {
		const response = await fetch(`/api/departments/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const responseJson = await response.json();
		dispatch(updateDepartmentSuccess(id, data));
	};
}

export function updateDepartmentSuccess(id, data) {
	return { type: 'UPDATE_DEPARTMENT', id, data };
}

export function deleteManyDepartments(filter) {
	return async (dispatch) => {
		const response = await fetch(`/api/departments`, {
			credentials: 'same-origin',
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter)
		});
		const responseJson = await response.json();
		dispatch(deleteManyDepartmentsSuccess(filter));
	};
}

export function deleteManyDepartmentsSuccess(filter) {
	return { type: 'DELETE_MANY_DEPARTMENTS', filter };
}
