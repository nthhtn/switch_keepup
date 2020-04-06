import { combineReducers } from 'redux';

import device from './Device';
import category from './Category';
import user from './User';
import department from './Department';

export default combineReducers({ device, category, user, department });
