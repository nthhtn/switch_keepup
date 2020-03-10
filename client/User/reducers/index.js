import { combineReducers } from 'redux';

import device from './Device';
import category from './Category';
import user from './User';

export default combineReducers({ device, category, user });
