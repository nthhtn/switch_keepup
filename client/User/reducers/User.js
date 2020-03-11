const initialState = { list: [], errorMessage: '' };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_USER': return { ...state, errorMessage: '', list: [action.user, ...state.list] };
		case 'LIST_USER': return { ...state, errorMessage: '', list: action.list };
		case 'UPDATE_USER': return { ...state, errorMessage: '', list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_USERS': return { ...state, errorMessage: '', list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		case 'USER_ERROR': return { ...state, errorMessage: action.errorMessage };
		default: return state;
	}
};
