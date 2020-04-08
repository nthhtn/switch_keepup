const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CALIBRATION': return { ...state, list: [action.calibration, ...state.list] };
		case 'LIST_CALIBRATION': return { ...state, list: action.list };
		case 'UPDATE_CALIBRATION': return { ...state, list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_CALIBRATIONS': return { ...state, list: state.list.filter((item) => action.filter.id.indexOf(item.id) === -1) };
		default: return state;
	}
};
