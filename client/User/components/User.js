import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class User extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let listUser = new Array(4).fill({}).map((item, i) => ({
			id: i,
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
							<BootstrapTable data={listUser} id="table-user" version='4' search>
								<TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
								<TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
								<TableHeaderColumn dataField='fullname'>Full Name</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
