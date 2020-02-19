import React, { Component } from 'react';

class UserItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<tr>
				<td>{this.props.username}</td>
				<td>{this.props.email}</td>
				<td>{this.props.fullname}</td>
				<td>{this.props.role}</td>
				<td className="text-center">
					<div className="btn-group">
						<button type="button"
							className="btn btn-sm btn-primary js-tooltip-enabled" data-toggle="tooltip" title="" data-original-title="Edit">
							<i className="fa fa-fw fa-pencil-alt"></i>
						</button>
						<button type="button"
							className="btn btn-sm btn-primary js-tooltip-enabled" data-toggle="tooltip" title="" data-original-title="Delete">
							<i className="fa fa-fw fa-times"></i>
						</button>
					</div>
				</td>
			</tr>
		);
	}

}

export default class User extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let list = new Array(4).fill({}).map((item, i) => ({
			username: 'User ' + i,
			email: 'testuser' + i + '@gmail.com',
			fullname: 'User ' + i,
			role: i % 2 === 0 ? 'Manager' : 'Engineer'
		}));
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of users</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<button type="button" className="btn btn-success mr-1 mb-3">
								<i className="fa fa-fw fa-plus mr-1"></i> Add a user
							</button>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>Username</th>
											<th>Email</th>
											<th>Full name</th>
											<th>Role</th>
											<th className="text-center">Actions</th>
										</tr>
									</thead>
									<tbody>
										{list.map((user, i) =>
											<UserItem key={`user-${i}`} {...user} />
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
