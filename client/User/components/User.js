import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { createUser, listUser, updateUser } from '../actions/User';

let self;

export default class User extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async componentDidMount() {
		await this.props.dispatch(listUser());
	}

	async createUser() {
		const email = $('#create-email').val();
		const fullname = $('#create-fullname').val();
		const role = $('#create-role').val();
		if (!email || !fullname || role == 0) {
			$('#create-user-error').text('Invalid field(s)');
			return;
		}
		const basedata = { email, fullname, role };
		await self.props.dispatch(createUser(basedata));
		if (self.props.user.errorMessage) {
			$('#create-user-error').text(self.props.user.errorMessage);
			return;
		}
		$('#modal-create-user input').val('');
		$('#modal-create-user select').val('');
		$('#create-user-error').text('');
		$('#modal-create-user').modal('hide');
	}

	async updateUser() {
		const id = $('#update-id').val();
		const email = $('#update-email').val();
		const fullname = $('#update-fullname').val();
		const role = $('#update-role').val();
		await self.props.dispatch(updateUser(id, { fullname, role }));
		if (!id || !email || !fullname || role == 0) {
			$('#update-user-error').text('Invalid field(s)');
			return;
		}
		$('#update-user-error').text('');
		$('#modal-update-user input').val('');
		$('#modal-update-user select').val('');
		$('#modal-update-user').modal('hide');
	}

	showUpdateModal(row) {
		const { id, email, fullname, role } = row;
		$('#update-id').val(id);
		$('#update-email').val(email);
		$('#update-fullname').val(fullname);
		$('#update-role').val(role);
		$('#modal-update-user').modal('show');
	}

	render() {
		const listUser = this.props.user.list;
		const createCustomInsertButton = (onClick) => {
			return (
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create-user">
					<i className="fa fa-fw fa-plus mr-1"></i> New
				</button>
			);
		}
		const tableOptions = { insertBtn: createCustomInsertButton, onRowClick: this.showUpdateModal };
		const roleClassName = (cell, row, rowid, colid) => cell === 'manager' ? 'badge-success' : 'badge-danger';
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
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Add user</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-email">Email*</label>
														<input type="email" className="form-control" id="create-email" placeholder="Email cannot be changed" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-fullname">Full Name*</label>
														<input type="text" className="form-control" id="create-fullname" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-role">Role*</label>
														<select className="form-control" id="create-role">
															<option value="0">Please select</option>
															<option value="manager">Manager</option>
															<option value="engineer">Engineer</option>
														</select>
													</div>
												</div>
											</div>
											<label id='create-user-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createUser}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-user" tabIndex="-1" role="dialog" aria-labelledby="modal-update-user" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Edit user</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12" hidden>
														<label htmlFor="update-id">ID*</label>
														<input type="text" className="form-control" id="update-id" disabled />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-email">Email*</label>
														<input type="email" className="form-control" id="update-email" placeholder="Email cannot be changed" disabled />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-fullname">Full Name*</label>
														<input type="text" className="form-control" id="update-fullname" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-role">Role*</label>
														<select className="form-control" id="update-role">
															<option value="0">Please select</option>
															<option value="manager">Manager</option>
															<option value="engineer">Engineer</option>
														</select>
													</div>
												</div>
											</div>
											<label id='update-user-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateUser}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<BootstrapTable data={listUser} id="table-user" version='4' search options={tableOptions} insertRow bodyStyle={{ cursor: 'pointer' }}>
								<TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
								<TableHeaderColumn dataField='email' >Email</TableHeaderColumn>
								<TableHeaderColumn dataField='fullname'>Full Name</TableHeaderColumn>
								<TableHeaderColumn dataField='role' columnClassName={roleClassName}>Role</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
