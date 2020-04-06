const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_DEPARTMENT': return { ...state, list: [action.department, ...state.list] };
		case 'LIST_DEPARTMENT': return { ...state, list: action.list };
		case 'UPDATE_DEPARTMENT': return { ...state, list: state.list.map((item) => item.id == action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_MANY_DEPARTMENTS': return { ...state, list: state.list.filter((item) => action.filter.id.indexOf(item.id) == -1) };
		default: return state;
	}
};
