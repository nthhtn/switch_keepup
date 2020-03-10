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
								{list.map((item) =>
									(<div className="col-md-2 text-center" key={item.id}>
										<img src='https://cdn.onlinewebfonts.com/svg/img_191639.png' alt="" style={{ maxWidth: '100%' }} />
										<Link to={{ pathname: '/dashboard/devices', state: { categoryName: item.name } }}>
											<h4>{item.name}</h4>
										</Link>
									</div>))
								}
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
