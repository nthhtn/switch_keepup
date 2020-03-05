import React, { Component } from 'react';

import { createDevice, listDevice } from '../actions/Device';

let self;

export default class Device extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	async componentDidMount() {
		await this.props.dispatch(listDevice());
		const devices = self.props.device.list;
		const columns = [
			{ data: 'id' },
			{ data: 'name' },
			{ data: 'description' },
			{ data: 'serialNo' },
			{ data: 'calibrationPeriod' },
			{ data: 'location' },
			{ data: 'seller' },
			{ data: 'servicePartner' },
			{ data: 'deviceFunction' },
			{ data: 'comment' }
		];
		$('#table-device').DataTable({
			paging: true,
			ordering: true,
			columns,
			data: devices
		});
	}

	async createDevice() {
		const id = $('#create-id').val();
		const name = $('#create-name').val();
		// const categoryId = $('#create-category').val();
		const description = $('#create-description').val() || '';
		const serialNo = $('#create-serialno').val();
		const calibrationPeriod = $('#create-calperiod').val();
		const location = $('#create-location').val() || '';
		const seller = $('#create-seller').val() || '';
		const servicePartner = $('#create-partner').val() || '';
		const deviceFunction = $('#create-function').val() || '';
		const comment = $('#create-comment').val() || '';
		if (!id || !name || !serialNo || calibrationPeriod <= 0) {
			$('#create-device-error').text('Invalid field(s)');
			return;
		}
		const basedata = { id, name, description, serialNo, calibrationPeriod, location, seller, servicePartner, deviceFunction, comment };
		await self.props.dispatch(createDevice(basedata));
		$('#modal-create-device input').val('');
		$('#modal-create-device textarea').val('');
		$('#modal-create-device select').val('0');
		$('#create-device-error').text('');
		$('#modal-create-device').modal('hide');
		const newdevice = self.props.device.list[0];
		const table = $('#table-device').DataTable();
		table.row.add(newdevice).draw();
	}

	render() {
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
							<button type="button" className="btn btn-success mr-1 mb-3" data-toggle="modal" data-target="#modal-create-device">
								<i className="fa fa-fw fa-plus mr-1"></i> Add a device
							</button>
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
														<label htmlFor="create-category">Category</label>
														<select className="form-control" id="create-category">
															<option value="0">Please select</option>
															<option value="1">Turbine</option>
															<option value="2">Rotor</option>
														</select>
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-serialno">Serial Number</label>
														<input type="text" className="form-control" id="create-serialno" />
													</div>
													<div className="form-group col-sm-12">
														<label htmlFor="create-description">Description</label>
														<textarea className="form-control" id="create-description" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-calperiod">Calibration Period</label>
														<input type="number" className="form-control" id="create-calperiod" />
													</div>
													<div className="form-group col-sm-3">
														<label htmlFor="create-location">Location</label>
														<select className="form-control" id="create-location">
															<option value="0">Please select</option>
															<option value="1">Lappeenranta</option>
															<option value="2">Vaasa</option>
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
													<div className="form-group col-sm-12">
														<label htmlFor="create-comment">Comment</label>
														<textarea className="form-control" id="comment" />
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
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter" id="table-device">
									<thead>
										<tr>
											<th>ID</th>
											<th>Device name</th>
											<th>Description</th>
											<th>S/N</th>
											<th>Cal. period</th>
											<th>Location</th>
											<th>Seller</th>
											<th>Service partner</th>
											<th>Function</th>
											<th>Comments</th>
										</tr>
									</thead>
									<tbody>
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
