const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_DEVICE': return { ...state, list: [action.device, ...state.list] };
		case 'LIST_DEVICE': return { ...state, list: action.list };
		case 'UPDATE_DEVICE': return { ...state, list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'UPDATE_MANY_DEVICES': return {
			...state,
			list: state.list.map((item) => action.filter.id.indexOf(item.id) > -1 ? { ...item, ...action.data } : item)
		};
		case 'DELETE_MANY_DEVICES': return { ...state, list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		default: return state;
	}
};
