import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import store from './store';

const rootComponent = (
	<Provider store={store}>
		<BrowserRouter>
			<div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed side-trans-enabled">
				<nav id="sidebar">
					<div className="simplebar-scroll-content" style={{ paddingRight: '15px', marginBottom: '-30px' }}>
						<div className="simplebar-content" style={{ paddingBottom: '15px', marginRight: '-15px' }}>
							<div className="content-header bg-white-5">
								<a className="font-w600 text-dual" href="index.html">
									<i className="fa fa-circle-notch text-primary"></i>
									<span className="smini-hide">
										<span className="font-w700 font-size-h5">ne</span> <span className="font-w400">4.2</span>
									</span>
								</a>
								<a className="d-lg-none text-dual ml-3" data-toggle="layout" data-action="sidebar_close" href={undefined} onClick={(e) => e.preventDefault()}>
									<i className="fa fa-times"></i>
								</a>
							</div>
							<div className="content-side content-side-full">
								<ul className="nav-main">
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard">
											<i className="nav-main-link-icon si si-speedometer"></i>
											<span className="nav-main-link-name">Dashboard</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard/devices">
											<i className="nav-main-link-icon si si-wrench"></i>
											<span className="nav-main-link-name">Device</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard/calibrations">
											<i className="nav-main-link-icon si si-docs"></i>
											<span className="nav-main-link-name">Calibration</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard/categories">
											<i className="nav-main-link-icon si si-list"></i>
											<span className="nav-main-link-name">Category</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard/departments">
											<i className="nav-main-link-icon si si-grid"></i>
											<span className="nav-main-link-name">Department</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/dashboard/users">
											<i className="nav-main-link-icon si si-users"></i>
											<span className="nav-main-link-name">User</span>
										</Link>
									</li>
									<li className="nav-main-item">
										<Link className="nav-main-link active" to="/logout">
											<i className="nav-main-link-icon si si-logout"></i>
											<span className="nav-main-link-name">Logout</span>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
				<header id="page-header">
				</header>
				<Main />
			</div>
		</BrowserRouter>
	</Provider>
);

render(rootComponent, document.getElementById('root'));
