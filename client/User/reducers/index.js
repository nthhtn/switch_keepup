import { combineReducers } from 'redux';

import device from './Device';
import category from './Category';
import user from './User';
import department from './Department';
import calibration from './Calibration';

export default combineReducers({ device, category, user, department, calibration });
