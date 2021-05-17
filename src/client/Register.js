import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { message } from 'antd';
import { register } from '../firebase/client';
class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			username: '',
			password: '',
			confirmPassword: '',
		};
	}
	handleChange = (value, field) => {
		this.setState({ [field]: value });
	};
	handleSubmit = () => {
		const data = this.state;
		if (data.password !== data.confirmPassword) {
			message.error({ content: 'Mật khẩu không trùng khớp' });
			return;
		}
		register(_.pick(data, ['name', 'username', 'password']))
			.then(res => {
				message.success({ content: 'Đăng kí thành công' });
				window.location.replace('/login');
			})
			.catch(err => {
				message.error({ content: 'Đăng kí không thành công' });
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
								<div style={{ margin: '0 auto', width: '40%' }}>
									<div class="">
										<div class="panel-body">
											<form role="form">
												<div class="form-group">
													<h2>Đăng kí tài khoản</h2>
												</div>
												<div class="form-group">
													<label class="control-label" for="signupName">
														Họ và tên
													</label>
													<input
														id="signupName"
														type="text"
														maxlength="50"
														class="form-control"
														onChange={e => this.handleChange(e.target.value, 'name')}
													/>
												</div>
												<div class="form-group">
													<label class="control-label" for="signupEmail">
														Tên đăng nhập
													</label>
													<input
                            autoComplete="off"
                            autofill="off"
														id="signupEmail"
														type="email"
														maxlength="50"
														class="form-control"
														onChange={e => this.handleChange(e.target.value, 'username')}
													/>
												</div>
												<div class="form-group">
													<label class="control-label" for="signupPassword">
														Mật khẩu
													</label>
													<input
														id="signupPassword"
														type="password"
														maxlength="25"
														class="form-control"
														placeholder="at least 6 characters"
														length="40"
														onChange={e => this.handleChange(e.target.value, 'password')}
													/>
												</div>
												<div class="form-group">
													<label class="control-label" for="signupPasswordagain">
														Xác nhận mật khẩu
													</label>
													<input
														id="signupPasswordagain"
														type="password"
														maxlength="25"
														class="form-control"
														onChange={e => this.handleChange(e.target.value, 'confirmPassword')}
													/>
												</div>
												<div class="form-group">
													<button type="button" class="btn btn-hover color-3" onClick={this.handleSubmit}>
														Tạo tài khoản
													</button>
												</div>
												<p class="form-group">
													Bằng cách bấm vào tạo tài khoản, bạn đã đồng ý với <a href="#">Điều khoản sử dụng </a> và{' '}
													<a href="#">chính sách quyền riêng tư</a> của chúng tôi
												</p>
												<p>
													<p></p>Đã có tài khoản? <Link to="login">Đăng nhập</Link>
												</p>
											</form>
										</div>
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

export default Register;
