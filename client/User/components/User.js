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
		let createCustomInsertButton = (onClick) => {
			return (
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create-user">
					<i className="fa fa-fw fa-plus mr-1"></i> New
				</button>
			);
		}
		const options = {
			insertBtn: createCustomInsertButton
		};
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
							<div className="modal fade" id="modal-create-user" tabIndex="-1" role="dialog" aria-labelledby="modal-create-user" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-xl" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Add device</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-3">
														<label htmlFor="create-id">Device ID*</label>
														<input type="text" className="form-control" id="create-id" placeholder="ID cannot be changed" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-name">Device name*</label>
														<input type="text" className="form-control" id="create-name" />
													</div>
												</div>
											</div>
											<label id='create-user-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createDevice}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<BootstrapTable data={listUser} id="table-user" version='4' search options={options} insertRow>
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
