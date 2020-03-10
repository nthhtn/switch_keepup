// export function createCategory(category) {
// 	return async (dispatch) => {
// 		const response = await fetch(`/api/categories`, {
// 			credentials: 'same-origin',
// 			method: 'post',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(category)
// 		});
// 		const responseJson = await response.json();
// 		dispatch(createCategorySuccess(responseJson.result));
// 	};
// };

// export function createCategorySuccess(category) {
// 	return { type: 'CREATE_CATEGORY', category };
// };

export function listCategory() {
	return async (dispatch) => {
		const response = await fetch(`/api/categories`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listCategorySuccess(responseJson.result));
	};
};

export function listCategorySuccess(list) {
	return { type: 'LIST_CATEGORY', list };
};

// export function updateCategory(id, data) {
// 	return async (dispatch) => {
// 		const response = await fetch(`/api/categories/${id}`, {
// 			credentials: 'same-origin',
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(data)
// 		});
// 		const responseJson = await response.json();
// 		dispatch(updateCategorySuccess(id, data));
// 	};
// }

// export function updateCategorySuccess(id, data) {
// 	return { type: 'UPDATE_CATEGORY', id, data };
// }

// export function deleteCategory(id) {
// 	return async (dispatch) => {
// 		const response = await fetch(`/api/categories/${id}`, {
// 			credentials: 'same-origin',
// 			method: 'delete'
// 		});
// 		const responseJson = await response.json();
// 		dispatch(deleteCategorySuccess(id));
// 	};
// }

// export function deleteCategorySuccess(id) {
// 	return { type: 'DELETE_CATEGORY', id };
// }
