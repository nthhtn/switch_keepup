import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let self;

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	render() {
		const list = this.props.category.list;
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">Welcome to Switch KeepUp</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<div className="row">
								{list.map((item) => {
									let url = '/assets/images/asset.png';
									if (item.name.indexOf('Tool') > -1) {
										url = '/assets/images/tool.png';
									} else if (item.name.indexOf('Measurement') > -1) {
										url = '/assets/images/measurement.png';
									}
									return (
										<div className="col-md-2 text-center" key={item.id}>
											<Link to={{ pathname: '/dashboard/devices', state: { categoryName: item.name } }}>
												<img src={url} alt="" style={{ maxWidth: '100%' }} />
												<h4>{item.name}</h4>
											</Link>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
