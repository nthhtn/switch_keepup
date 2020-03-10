const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_USER': return { list: [action.user, ...state.list] };
		case 'LIST_USER': return { list: action.list };
		case 'UPDATE_USER': return { list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_USERS': return { list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		default: return state;
	}
};
