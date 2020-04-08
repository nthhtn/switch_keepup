import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Device from './Device';
import Calibration from './Calibration';
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
				<Route exact path='/dashboard'
					render={() => <Home {...this.props} />} />
				<Route exact path='/dashboard/devices'
					render={(props) => <Device {...this.props} {...props} />} />
				<Route exact path='/dashboard/calibrations'
					render={(props) => <Calibration {...this.props} {...props} />} />
				<Route exact path='/dashboard/departments'
					render={() => <Department {...this.props} />} />
				<Route exact path='/dashboard/users'
					render={() => <User {...this.props} />} />
				<Route path='*'
					render={() => <Home {...this.props} />} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
