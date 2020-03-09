import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit() {
		const email = $('#login-username').val();
		const password = $('#login-password').val();
		if (!email) {
			$('#login-error').html('Username must not be empty');
		}
		if (!password) {
			$('#login-error').html('Password must not be empty');
		}
		axios.post('/login', { email, password })
			.then((response) => {
				window.location.href = '/dashboard';
			})
			.catch((error) => {
				$('#login-error').html(error.response.data.error);
			});
	}

	render() {
		return (
			<div id="page-container">
				<main id="main-container">
					<div className="bg-image" style={{ 'backgroundImage': 'url("/assets/oneui/media/photos/photo6@2x.jpg")' }}>
						<div className="hero-static bg-white-95">
							<div className="content">
								<div className="row justify-content-center">
									<div className="col-md-8 col-lg-6 col-xl-4">
										<div className="block block-themed block-fx-shadow mb-0">
											<div className="block-header">
												<h3 className="block-title">Welcome to Switch KeepUp</h3>
												<div className="block-options">
												</div>
											</div>
											<div className="block-content">
												<div className="p-sm-3 px-lg-4 py-lg-5">
													<p>Please login</p>
													<div className="js-validation-signin">
														<div className="py-3">
															<div className="form-group">
																<input type="text"
																	className="form-control form-control-alt form-control-lg"
																	id="login-username" placeholder="Username" />
															</div>
															<div className="form-group">
																<input type="password"
																	className="form-control form-control-alt form-control-lg"
																	id="login-password" placeholder="Password" />
															</div>
														</div>
														<p id="login-error" style={{ color: 'red' }}></p>
														<div className="form-group row">
															<div className="col-md-6 col-xl-5">
																<button type="submit" className="btn btn-block btn-primary" onClick={this.handleSubmit}><i className="fa fa-fw fa-sign-in-alt mr-1"></i> Login</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="content content-full font-size-sm text-muted text-center">
								<strong>OneUI 4.2</strong> &copy; <span data-toggle="year-copy"></span>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}

}
