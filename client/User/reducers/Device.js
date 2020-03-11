const initialState = { list: [], errorMessage: '' };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_DEVICE': return { ...state, errorMessage: '', list: [action.device, ...state.list] };
		case 'LIST_DEVICE': return { ...state, errorMessage: '', list: action.list };
		case 'UPDATE_DEVICE': return { ...state, errorMessage: '', list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_DEVICES': return { ...state, errorMessage: '', list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		case 'DEVICE_ERROR': return { ...state, errorMessage: action.errorMessage };
		default: return state;
	}
};
