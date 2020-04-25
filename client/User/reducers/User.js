const initialState = {
	list: [],
	me: { fullname: '', email: '', role: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_USER': return { ...state, list: [action.user, ...state.list] };
		case 'LIST_USER': return { ...state, list: action.list };
		case 'UPDATE_USER': return { ...state, list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_USERS': return { ...state, list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		case 'GET_MY_PROFILE': return { ...state, me: action.result };
		case 'UPDATE_MY_PROFILE': return { ...state, me: { ...state.me, ...action.data } };
		default: return state;
	}
};
