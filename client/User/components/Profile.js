import React, { Component } from 'react';
import swal from 'sweetalert2';

import { updateMyProfile } from '../actions/User';

let self;

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		self = this;
	}

	componentDidMount() {
		const { fullname, email, role } = this.props.user.me;
		$('#fullname').val(fullname);
		$('#email').val(email);
	}

	updateProfile() {
		const fullname = $('#fullname').val();
		const oldpass = $('#oldpass').val();
		const newpass = $('#newpass').val();
		if (!fullname) {
			$('#profile-error').text('Full name cannot be empty');
			return;
		}
		let data = { fullname };
		if (newpass && !oldpass) {
			$('#profile-error').text('You must confirm your current password to change it');
			return;
		} else if (newpass && oldpass) {
			if (newpass === oldpass) {
				$('#profile-error').text('Old and new password must be different');
				return;
			}
			data = { fullname, newpass, oldpass };
		} else if (!newpass && oldpass) {
			data = { fullname, oldpass };
		}
		self.props.dispatch(updateMyProfile(data, (error) => {
			if (error) {
				$('#profile-error').text(error.message);
				return;
			}
			swal.fire({
				html: 'Successful update!',
				timer: 2000
			});
			$('#profile-error').text('');
		}));
	}

	render() {
		return (
			<main id="main-container">
				<div className="bg-body-light">
					<div className="content content-full">
						<div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
							<h1 className="flex-sm-fill h3 my-2">My Profile</h1>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="block">
						<div className="block-content">
							<div className="row">
								<div className="form-group col-sm-6">
									<label htmlFor="fullname">Full name*</label>
									<input type="text" className="form-control" id="fullname" />
								</div>
								<div className="form-group col-sm-6">
									<label htmlFor="email">Email*</label>
									<input type="email" className="form-control" id="email" placeholder="Email cannot be changed" disabled />
								</div>
								<div className="form-group col-sm-6">
									<label htmlFor="newpass">Change your password</label>
									<input type="password" className="form-control" id="newpass" placeholder="Leave empty if you do not want to change" />
								</div>
								<div className="form-group col-sm-6">
									<label htmlFor="oldpass">Confirm password</label>
									<input type="password" className="form-control" id="oldpass" placeholder="Confirm you want to change password" />
								</div>
								<div className="form-group col-sm-12">
									<label id='profile-error' style={{ color: 'red' }}></label>
								</div>
								<div className="form-group" style={{ padding: '0px 14px' }}>
									<button type="button" className="form-control btn btn-sm btn-primary" onClick={this.updateProfile}>
										<i className="fa fa-check mr-1"></i> Save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}

}
