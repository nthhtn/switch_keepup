import React, { Component } from 'react';

class DeviceItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<tr>
				<td>{this.props.deviceId}</td>
				<td>{this.props.deviceName}</td>
				<td>{this.props.category}</td>
				<td>{this.props.description}</td>
				<td>{this.props.serialNo}</td>
				<td>{this.props.lastCalibration}</td>
				<td>{this.props.nextCalibration}</td>
				<td>{this.props.location}</td>
				<td>{this.props.department}</td>
				<td>{this.props.seller}</td>
				<td>{this.props.servicePartner}</td>
				<td>{this.props.addedBy}</td>
				<td>{this.props.comments}</td>
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

export default class Device extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let list = new Array(10).fill({}).map((item, i) => ({
			deviceId: i,
			deviceName: 'Device ' + i,
			category: i % 2 === 0 ? 'Turbine' : 'Rotor',
			description: '',
			serialNo: 'XXX-' + i,
			lastCalibration: new Date().toString(),
			nextCalibration: new Date().toString(),
			location: i % 3 === 0 ? 'Vaasa' : 'Lappeenranta',
			department: 'Wind',
			seller: 'Unknown',
			servicePartner: 'Unknown',
			addedBy: 'Manager 1',
			comments: ''
		}));
		console.log(list);
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
							<button type="button" className="btn btn-success mr-1 mb-3">
								<i className="fa fa-fw fa-plus mr-1"></i> Add a device
							</button>
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>ID</th>
											<th>Device name</th>
											<th>Category</th>
											<th>Description</th>
											<th>S/N</th>
											<th>Last calibration</th>
											<th>Next calibration</th>
											<th>Location</th>
											<th>Department</th>
											<th>Seller</th>
											<th>Service partner</th>
											<th>Added by</th>
											<th>Comments</th>
											<th className="text-center">Actions</th>
										</tr>
									</thead>
									<tbody>
										{list.map((device, i) =>
											<DeviceItem key={`device-${i}`} {...device} />
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
