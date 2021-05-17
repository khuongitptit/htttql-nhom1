import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
class AdminLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}
	onFinish = values => {
    const {username, password} = values;
		if(username === 'admin' && password === 'admin') {
      localStorage.setItem('admin', JSON.stringify({username: 'admin', password: 'admin'}))
      // window.location.replace('/admin/order');
      this.setState({redirect: true},() => this.setState({redirect: false}))
    }
	};
	render() {
    if(this.state.redirect) {
      return <Redirect to="/admin/order"/>
    }
		return (
			<div
				style={{
					width: '400px',
					position: 'relative',
					left: '50%',
					transform: 'translateX(-50%)',
					marginTop: '200px',
					border: '1px solid #ededed',
          padding: '20px',
				}}
			>
        <h1 style={{textAlign:'center'}}>Đăng nhập ADMIN</h1>
				<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
					<Form.Item name="username" rules={[{ required: true, message: 'Điền tên đăng nhập' }]}>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
					</Form.Item>
					<Form.Item name="password" rules={[{ required: true, message: 'Điền mật khẩu' }]}>
						<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<a className="login-form-forgot" href="">
							Forgot password
						</a>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default AdminLogin;
