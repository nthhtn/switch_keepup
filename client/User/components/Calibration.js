import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import swal from 'sweetalert2';

import { createCalibration, listCalibration, updateCalibration } from '../actions/Calibration';

let self;

export default class Calibration extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		await this.props.dispatch(listCalibration());
		$('#create-date').datepicker({ format: 'yyyy-mm-dd', startDate: "now()" });
		$('#update-date').datepicker({ format: 'yyyy-mm-dd', startDate: "now()" });
	}

	async createCalibration() {
		const date = $('#create-date').val();
		const doc = $('#create-document').val() || '';
		const status = $('#create-status').val();
		if (!date || status == 0) {
			$('#create-calibration-error').text('Invalid field(s)');
			return;
		}
		const basedata = { date, document: doc, status };
		await self.props.dispatch(createCalibration(basedata));
		if (self.props.calibration.errorMessage) {
			$('#create-calibration-error').text(self.props.calibration.errorMessage);
			return;
		}
		$('#modal-create-calibration input').val('');
		$('#modal-create-calibration select').val('');
		$('#create-calibration-error').text('');
		$('#modal-create-calibration').modal('hide');
	}

	async updateCalibration() {
		const id = $('#update-id').val();
		const date = $('#update-date').val();
		const doc = $('#update-document').val() || '';
		const status = $('#update-status').val();
		if (!id || !date || !doc || status == 0) {
			$('#update-calibration-error').text('Invalid field(s)');
			return;
		}
		await self.props.dispatch(updateCalibration(id, { document: doc, status }));
		$('#update-calibration-error').text('');
		$('#modal-update-calibration input').val('');
		$('#modal-update-calibration select').val('');
		$('#modal-update-calibration').modal('hide');
	}

	showUpdateModal(row) {
		const { id, deviceId, date, status } = row;
		$('#update-id').val(id);
		$('#update-deviceid').val(deviceId);
		$('#update-date').val(date);
		$('#update-status').val(status);
		$('#modal-update-calibration').modal('show');
	}

	render() {
		const listCalibration = this.props.calibration.list;
		const createCustomInsertButton = (onClick) => {
			return (
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create-calibration">
					<i className="fa fa-fw fa-plus mr-1"></i> New
				</button>
			);
		}
		const tableOptions = { insertBtn: createCustomInsertButton, onRowClick: this.showUpdateModal };
		const statusClassName = (cell, row, rowid, colid) => cell === 'completed' ? 'badge-success' : 'badge-danger';
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of calibrations</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<div className="modal fade" id="modal-create-calibration" tabIndex="-1" status="dialog" aria-labelledby="modal-create-calibration" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" status="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Add calibration</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-12">
														<label htmlFor="create-date">Date*</label>
														<input type="text" className="form-control" id="create-date" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-document">Document</label>
														<input type="text" className="form-control" id="create-document" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-status">Status*</label>
														<select className="form-control" id="create-status">
															<option value="0">Please select</option>
															<option value="pending">Pending</option>
															<option value="completed">Completed</option>
														</select>
													</div>
												</div>
											</div>
											<label id='create-calibration-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createCalibration}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-calibration" tabIndex="-1" status="dialog" aria-labelledby="modal-update-calibration" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-md" status="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Edit calibration</h3>
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
														<label htmlFor="update-date">Date*</label>
														<input type="text" className="form-control" id="update-date" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-document">Document</label>
														<input type="text" className="form-control" id="update-document" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-status">Status*</label>
														<select className="form-control" id="update-status">
															<option value="0">Please select</option>
															<option value="pending">Pending</option>
															<option value="completed">Completed</option>
														</select>
													</div>
												</div>
											</div>
											<label id='update-calibration-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateCalibration}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<BootstrapTable data={listCalibration} id="table-calibration" version='4' search options={tableOptions} insertRow bodyStyle={{ cursor: 'pointer' }}>
								<TableHeaderColumn dataField='id' isKey hidden>Calibration ID</TableHeaderColumn>
								<TableHeaderColumn dataField='Device.id' >Device ID </TableHeaderColumn>
								<TableHeaderColumn dataField='Device.name' >Device Name</TableHeaderColumn>
								<TableHeaderColumn dataField='date' >Date</TableHeaderColumn>
								<TableHeaderColumn dataField='status' columnClassName={statusClassName}>Status</TableHeaderColumn>
								<TableHeaderColumn dataField='document'>Document</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
