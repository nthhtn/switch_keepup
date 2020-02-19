import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Device from './Device';
import Calibration from './Calibration';
import Category from './Category';
import Department from './Department';
import User from './User';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route exact path='/dashboard' component={Home} />
				<Route exact path='/dashboard/devices' component={Device} />
				<Route exact path='/dashboard/calibrations' component={Calibration} />
				<Route exact path='/dashboard/categories' component={Category} />
				<Route exact path='/dashboard/departments' component={Department} />
				<Route exact path='/dashboard/users' component={User} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
