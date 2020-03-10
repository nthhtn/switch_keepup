const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		// case 'CREATE_CATEGORY': return { list: [action.category, ...state.list] };
		case 'LIST_CATEGORY': return { list: action.list };
		// case 'UPDATE_CATEGORY': return { list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		// case 'DELETE_CATEGORY': return { list: state.list.filter((item) => item.id !== action.id) };
		default: return state;
	}
};
