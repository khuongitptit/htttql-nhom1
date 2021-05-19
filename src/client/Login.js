import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { message } from 'antd';
import { login } from '../firebase/client';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}
	handleChange = (value, field) => {
		this.setState({ [field]: value });
	};
	handleSubmit = () => {
		const data = this.state;
		login(data)
			.then(res => {
				if (!_.isEmpty(res)) {
					localStorage.setItem('user', JSON.stringify(res[0]));
					message.success({ content: 'Đăng nhập thành công' });
					this.props.history.push('/');
				} else {
					message.error({ content: 'Đăng nhập không thành công' });
				}
			})
			.catch(err => {
				message.error({ content: 'Đăng nhập không thành công' });
			});
	};
	render() {
		return (
			<div>
				<Header />
				<div id="breadcrumb" class="section">
					<div class="container">
						<section class="login-block">
							<div class="container">
								<div class="row">
									<div style={{ margin: '0 auto', width: '40%' }}>
										<h2 class="text-center">Đăng nhập</h2>
										<form class="login-form">
											<div class="form-group">
												<label for="exampleInputEmail1" class="text-uppercase">
													Tên đăng nhập
												</label>
												<input
													type="text"
													class="form-control"
													placeholder=""
													autoComplete="off"
													autofill="off"
													onChange={e => this.handleChange(e.target.value, 'username')}
												/>
											</div>
											<div class="form-group">
												<label for="exampleInputPassword1" class="text-uppercase">
													Mật khẩu
												</label>
												<input
													type="password"
													class="form-control"
													placeholder=""
													onChange={e => this.handleChange(e.target.value, 'password')}
												/>
											</div>

											<div
												class="form-check"
												style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
											>
												<p>
													Hoặc{' '}
													<Link to="register" class="create-count">
														đăng kí tài khoản
													</Link>
												</p>
											</div>
											<button type="button" class="btn btn-hover color-3" onClick={this.handleSubmit}>
												Đăng nhập
											</button>
										</form>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Login;
