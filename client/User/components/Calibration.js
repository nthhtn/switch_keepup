import React, { Component } from 'react';

class CalibrationItem extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<tr>
				<td>{this.props.deviceId}</td>
				<td>{this.props.date}</td>
				<td>
					{
						this.props.status === 'Completed' ?
							<span className="badge badge-success">{this.props.status}</span> : <span className="badge badge-primary">{this.props.status}</span>
					}
				</td>
				<td>{this.props.document}</td>
			</tr>
		);
	}

}

export default class Calibration extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let list = new Array(10).fill({}).map((item, i) => ({
			calibrationId: i,
			deviceId: 'Device ' + i,
			date: new Date().toString(),
			status: i % 2 === 0 ? 'Completed' : 'Waiting',
			document: '/localhost/lorem/ipsum/doc.pdf'
		}));
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
							<div className="table-responsive">
								<table className="table table-bordered table-striped table-vcenter">
									<thead>
										<tr>
											<th>Device ID</th>
											<th>Date</th>
											<th>Status</th>
											<th>Document</th>
										</tr>
									</thead>
									<tbody>
										{list.map((calibration, i) =>
											<CalibrationItem key={`calibration-${i}`} {...calibration} />
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
