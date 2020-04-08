import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import swal from 'sweetalert2';

import { createDepartment, listDepartment, updateDepartment, deleteManyDepartments } from '../actions/Department';

let self;

export default class Department extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async componentDidMount() {
		await this.props.dispatch(listDepartment());
	}

	async createDepartment() {
		const name = $('#create-name').val();
		const description = $('#create-description').val() || '';
		if (!name) {
			$('#create-department-error').text('Department name must not be empty');
			return;
		}
		const basedata = { name, description };
		await self.props.dispatch(createDepartment(basedata));
		if (self.props.user.errorMessage) {
			$('#create-department-error').text(self.props.user.errorMessage);
			return;
		}
		$('#modal-create-department input').val('');
		$('#modal-update-department textarea').val('');
		$('#create-department-error').text('');
		$('#modal-create-department').modal('hide');
	}

	async updateDepartment() {
		const id = $('#update-id').val();
		const name = $('#update-name').val();
		const description = $('#update-description').val() || '';
		if (!id || !name) {
			$('#update-department-error').text('Department name must not be empty');
			return;
		}
		await self.props.dispatch(updateDepartment(id, { name, description }));
		$('#update-department-error').text('');
		$('#modal-update-department input').val('');
		$('#modal-update-department textarea').val('');
		$('#modal-update-department').modal('hide');
	}

	showUpdateModal(row) {
		const { id, name, description } = row;
		$('#update-id').val(id);
		$('#update-name').val(name);
		$('#update-description').val(description);
		$('#modal-update-department').modal('show');
	}

	async deleteManyDepartments(next, rowKeys) {
		const listDepartment = self.props.department.list.filter((item) => (rowKeys.indexOf(item.id) > -1));
		const listStr = listDepartment.map((item) => `<li><strong>${item.name}</strong></li>`).join('');
		swal.fire({
			title: 'Are you sure?',
			html: `These departments will be permanently deleted:<ul style="list-style:none;padding:0;margin:0;">${listStr}</ul>This cannot be reverted!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete!'
		}).then(async (result) => {
			if (result.value) {
				await self.props.dispatch(deleteManyDepartments({ id: rowKeys }));
			}
		});
	}

	render() {
		const listDepartment = this.props.department.list;
		const createCustomInsertButton = (onClick) => {
			return (
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create-department">
					<i className="fa fa-fw fa-plus mr-1"></i> New
				</button>
			);
		}
		const createCustomDeleteButton = (onClick) => {
			return (
				<button type="button" className="btn btn-danger" onClick={onClick}>
					<i className="fa fa-fw fa-trash-alt mr-1"></i> Delete
				</button>
			)
		};
		const tableOptions = {
			insertBtn: createCustomInsertButton,
			onRowClick: this.showUpdateModal,
			deleteBtn: createCustomDeleteButton,
			handleConfirmDeleteRow: this.deleteManyDepartments
		};
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of departments</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<div className="modal fade" id="modal-create-department" tabIndex="-1" role="dialog" aria-labelledby="modal-create-department" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Add department</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-name">Department Name*</label>
														<input type="text" className="form-control" id="create-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-description">Description</label>
														<textarea rows="3" className="form-control" id="create-description" />
													</div>
												</div>
											</div>
											<label id='create-department-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createDepartment}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-department" tabIndex="-1" role="dialog" aria-labelledby="modal-update-department" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Edit department</h3>
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
														<label htmlFor="update-name">Deparment Name*</label>
														<input type="text" className="form-control" id="update-name" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-description">Description</label>
														<textarea rows="3" className="form-control" id="update-description" />
													</div>
												</div>
											</div>
											<label id='update-department-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateDepartment}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<BootstrapTable data={listDepartment} id="table-department" version='4' search
								options={tableOptions} insertRow deleteRow selectRow={{ mode: 'checkbox' }}
								bodyStyle={{ cursor: 'pointer' }}>
								<TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
								<TableHeaderColumn dataField='name' >Department Name</TableHeaderColumn>
								<TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
