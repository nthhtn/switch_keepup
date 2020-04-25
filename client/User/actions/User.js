export function createUser(user, callback) {
	return async (dispatch) => {
		const response = await fetch(`/api/users`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		});
		const responseJson = await response.json();
		if (responseJson.success) {
			dispatch(createUserSuccess(responseJson.result));
			return callback(null);
		}
		return callback(new Error(responseJson.error));
	};
};

export function createUserSuccess(user) {
	return { type: 'CREATE_USER', user };
};

export function listUser() {
	return async (dispatch) => {
		const response = await fetch(`/api/users`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listUserSuccess(responseJson.result));
	};
};

export function listUserSuccess(list) {
	return { type: 'LIST_USER', list };
};

export function updateUser(id, data) {
	return async (dispatch) => {
		const response = await fetch(`/api/users/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const responseJson = await response.json();
		dispatch(updateUserSuccess(id, data));
	};
}

export function updateUserSuccess(id, data) {
	return { type: 'UPDATE_USER', id, data };
}

export function deleteManyUsers(filter) {
	return async (dispatch) => {
		const response = await fetch(`/api/users`, {
			credentials: 'same-origin',
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(filter)
		});
		const responseJson = await response.json();
		dispatch(deleteManyUsersSuccess(filter));
	};
}

export function deleteManyUsersSuccess(filter) {
	return { type: 'DELETE_MANY_USERS', filter };
}

export function getMyProfile() {
	return async (dispatch) => {
		const response = await fetch(`/api/users/me`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(getMyProfileSuccess(responseJson.result));
	};
};

export function getMyProfileSuccess(result) {
	return { type: 'GET_MY_PROFILE', result };
};

export function updateMyProfile({ fullname, oldpass, newpass }, callback) {
	return async (dispatch) => {
		const response = await fetch(`/api/users/me`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ fullname, oldpass, newpass })
		});
		const responseJson = await response.json();
		if (responseJson.success) {
			dispatch(getMyProfileSuccess({ fullname }));
			return callback(null);
		}
		return callback(new Error(responseJson.error));
	};
};

export function updateMyProfileSuccess(data) {
	return { type: 'UPDATE_MY_PROFILE', data };
};
