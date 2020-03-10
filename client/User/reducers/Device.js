const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_DEVICE': return { list: [action.device, ...state.list] };
		case 'LIST_DEVICE': return { list: action.list };
		case 'UPDATE_DEVICE': return { list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_DEVICES': return { list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		default: return state;
	}
};
