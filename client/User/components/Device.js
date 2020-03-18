import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { createDevice, listDevice, updateDevice, deleteManyDevices } from '../actions/Device';

let self;

export default class Device extends Component {

	constructor(props) {
		super(props);
		this.state = { defaultCategory: props.location.state ? props.location.state.categoryName : null };
		self = this;
	}

	async componentDidMount() {
		await this.props.dispatch(listDevice());
	}

	async createDevice() {
		const id = $('#create-id').val();
		const name = $('#create-name').val();
		const categoryId = $('#create-category').val();
		const categoryName = $('#create-category option:selected').text();
		const description = $('#create-description').val() || '';
		const serialNo = $('#create-serialno').val();
		const calibrationPeriod = $('#create-calperiod').val();
		const location = $('#create-location').val();
		const seller = $('#create-seller').val() || '';
		const servicePartner = $('#create-partner').val() || '';
		const deviceFunction = $('#create-function').val() || '';
		const comment = $('#create-comment').val() || '';
		if (!id || !name || !serialNo || calibrationPeriod <= 0 || categoryId == 0 || location == 0) {
			$('#create-device-error').text('Invalid field(s)');
			return;
		}
		const basedata = {
			id, name, description, serialNo, calibrationPeriod, location, seller, servicePartner, deviceFunction, comment,
			categoryId, 'Category.name': categoryName
		};
		await self.props.dispatch(createDevice(basedata));
		if (self.props.device.errorMessage) {
			$('#create-device-error').text(self.props.device.errorMessage);
			return;
		}
		$('#modal-create-device input').val('');
		$('#modal-create-device textarea').val('');
		$('#modal-create-device select').val('');
		$('#create-device-error').text('');
		$('#modal-create-device').modal('hide');
	}

	async updateDevice() {
		const id = $('#update-id').val();
		const name = $('#update-name').val();
		const categoryId = $('#update-category').val();
		const categoryName = $('#update-category option:selected').text();
		const description = $('#update-description').val() || '';
		const serialNo = $('#update-serialno').val();
		const calibrationPeriod = $('#update-calperiod').val();
		const location = $('#update-location').val();
		const seller = $('#update-seller').val() || '';
		const servicePartner = $('#update-partner').val() || '';
		const deviceFunction = $('#update-function').val() || '';
		const comment = $('#update-comment').val() || '';
		if (!id || !name || !serialNo || calibrationPeriod <= 0 || categoryId == 0 || location == 0) {
			$('#update-device-error').text('Invalid field(s)');
			return;
		}
		const basedata = {
			name, description, serialNo, calibrationPeriod, location, seller, servicePartner, deviceFunction, comment,
			categoryId, 'Category.name': categoryName
		};
		await self.props.dispatch(updateDevice(id, basedata));
		if (self.props.device.errorMessage) {
			$('#update-device-error').text(self.props.device.errorMessage);
			return;
		}
		$('#modal-update-device input').val('');
		$('#modal-update-device textarea').val('');
		$('#modal-update-device select').val('');
		$('#update-device-error').text('');
		$('#modal-update-device').modal('hide');
	}

	async deleteManyDevices(next, rowKeys) {
		const rowKeysStr = rowKeys.join(', ');
		if (confirm(`Are you sure you want to delete ${rowKeysStr}?`)) {
			await self.props.dispatch(deleteManyDevices({ id: rowKeys }));
			next();
		}
	}

	showUpdateModal(row) {
		$('#modal-update-device').modal('show');
		console.log(row);
		const { id, name, description, serialNo, calibrationPeriod, location, seller, servicePartner, deviceFunction, comment,
			categoryId } = row;
		$('#update-id').val(id);
		$('#update-name').val(name);
		$('#update-category').val(categoryId);
		$('#update-description').val(description);
		$('#update-serialno').val(serialNo);
		$('#update-calperiod').val(calibrationPeriod);
		$('#update-location').val(location);
		$('#update-seller').val(seller);
		$('#update-partner').val(servicePartner);
		$('#update-function').val(deviceFunction);
		$('#update-comment').val(comment);
	}

	render() {
		const listCategory = this.props.category.list;
		let optionCategory = {};
		listCategory.forEach((item) => { optionCategory[item.name] = item.name; });
		const { defaultCategory } = this.state;
		const optionLocation = { Lappeenranta: 'Lappeenranta', Vaasa: 'Vaasa' };
		const listDevice = this.props.device.list;
		const createCustomInsertButton = (onClick) => {
			return (
				<button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-create-device">
					<i className="fa fa-fw fa-plus mr-1"></i> New
				</button>
			)
		}
		const tableOptions = {
			insertBtn: createCustomInsertButton,
			handleConfirmDeleteRow: this.deleteManyDevices,
			onRowClick: this.showUpdateModal
		};
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">List of devices</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<div className="modal fade" id="modal-create-device" tabIndex="-1" role="dialog" aria-labelledby="modal-create-device" aria-modal="true" style={{ paddingRight: '15px' }}>
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
													<div className="form-group col-sm-3">
														<label htmlFor="create-category">Category*</label>
														<select className="form-control" id="create-category">
															<option value='0'>Please select</option>
															{listCategory.map((item) => (
																<option key={item.id} value={item.id}>{item.name}</option>
															))}
														</select>
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-serialno">Serial Number*</label>
														<input type="text" className="form-control" id="create-serialno" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-description">Description</label>
														<textarea className="form-control" id="create-description" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-calperiod">Calibration Period*</label>
														<input type="number" className="form-control" id="create-calperiod" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-location">Location*</label>
														<select className="form-control" id="create-location">
															<option value="0">Please select</option>
															<option value="Lappeenranta">Lappeenranta</option>
															<option value="Vaasa">Vaasa</option>
														</select>
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-department">Department</label>
														<input type="text" className="form-control" id="create-department" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-seller">Seller</label>
														<input type="text" className="form-control" id="create-seller" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-partner">Service Partner</label>
														<input type="text" className="form-control" id="create-partner" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-function">Function</label>
														<input type="text" className="form-control" id="create-function" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="create-comment">Comment</label>
														<input type="text" className="form-control" id="comment" />
													</div>
												</div>
											</div>
											<label id='create-device-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.createDevice}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal fade" id="modal-update-device" tabIndex="-1" role="dialog" aria-labelledby="modal-update-device" aria-modal="true" style={{ paddingRight: '15px' }}>
								<div className="modal-dialog modal-xl" role="document">
									<div className="modal-content">
										<div className="block block-themed block-transparent mb-0">
											<div className="block-header bg-primary-dark">
												<h3 className="block-title">Edit device</h3>
												<div className="block-options">
													<button type="button" className="btn-block-option" data-dismiss="modal" aria-label="Close">
														<i className="fa fa-fw fa-times"></i>
													</button>
												</div>
											</div>
											<div className="block-content font-size-sm">
												<div className="row">
													<div className="form-group col-sm-3">
														<label htmlFor="update-id">Device ID*</label>
														<input type="text" className="form-control" id="update-id" placeholder="ID cannot be changed" disabled />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-name">Device name*</label>
														<input type="text" className="form-control" id="update-name" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-category">Category*</label>
														<select className="form-control" id="update-category">
															<option value='0'>Please select</option>
															{listCategory.map((item) => (
																<option key={item.id} value={item.id}>{item.name}</option>
															))}
														</select>
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-serialno">Serial Number*</label>
														<input type="text" className="form-control" id="update-serialno" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="update-description">Description</label>
														<textarea className="form-control" id="update-description" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-calperiod">Calibration Period*</label>
														<input type="number" className="form-control" id="update-calperiod" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-location">Location*</label>
														<select className="form-control" id="update-location">
															<option value="0">Please select</option>
															<option value="Lappeenranta">Lappeenranta</option>
															<option value="Vaasa">Vaasa</option>
														</select>
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-department">Department</label>
														<input type="text" className="form-control" id="update-department" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-seller">Seller</label>
														<input type="text" className="form-control" id="update-seller" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-partner">Service Partner</label>
														<input type="text" className="form-control" id="update-partner" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="update-function">Function</label>
														<input type="text" className="form-control" id="update-function" />
													</div>
													<div className="form-group col-sm-6">
														<label htmlFor="update-comment">Comment</label>
														<input type="text" className="form-control" id="comment" />
													</div>
												</div>
											</div>
											<label id='update-device-error' style={{ color: 'red', padding: '20px' }}></label>
											<div className="block-content block-content-full text-right border-top">
												<button type="button" className="btn btn-sm btn-light" data-dismiss="modal">Close</button>
												<button type="button" className="btn btn-sm btn-primary" onClick={this.updateDevice}><i className="fa fa-check mr-1"></i>Ok</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<BootstrapTable data={listDevice} id="table-device" version='4' pagination search
								deleteRow selectRow={{ mode: 'checkbox' }} options={tableOptions} insertRow
								bodyStyle={{ cursor: 'pointer' }}>
								<TableHeaderColumn width='150px' dataField='id' isKey dataSort>ID</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='name'>Device Name</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='Category.name' dataSort
									filter={{ type: 'SelectFilter', options: optionCategory, defaultValue: defaultCategory }}
								>Category</TableHeaderColumn>
								<TableHeaderColumn width='200px' dataField='createdAt' editable={false} dataSort>Added at</TableHeaderColumn>
								<TableHeaderColumn width='300px' dataField='description'>Description</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='serialNo'>S/N</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='calibrationPeriod'>Cal. period</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='location' dataSort
									filter={{ type: 'SelectFilter', options: optionLocation }}
								>Location</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='seller'>Seller</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='servicePartner'>Service Partner</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='deviceFunction'>Function</TableHeaderColumn>
								<TableHeaderColumn width='150px' dataField='comment'>Comment</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
