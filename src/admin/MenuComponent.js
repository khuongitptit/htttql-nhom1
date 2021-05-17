import React, { Component } from 'react';
import { Menu, Row, Col, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';

class MenuComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}
	handleSignOut = () => {
		localStorage.removeItem('admin');
		this.setState({ redirect: true }, () => this.setState({ redirect: false }));
	};
	render() {
		if (this.state.redirect) {
			return <Redirect to="/admin/login" />;
		}
		return (
			<Row>
				<Col span={8} offset={8}>
					<Menu mode="horizontal" style={{ textAlign: 'center' }}>
						<Menu.Item key="order">
							<Link to="order">Đơn hàng</Link>
						</Menu.Item>
						<Menu.Item key="product">
							<Link to="product">Hàng hóa</Link>
						</Menu.Item>
						{/* <Menu.Item key="customer">
          <Link to="customer">Khách hàng</Link>
        </Menu.Item> */}
						{/* <Menu.Item key="statistic">
          <Link to="statistic">Thống kê</Link>
        </Menu.Item> */}
					</Menu>
				</Col>
				<Col span={8}>
					<Button style={{marginTop:'10px'}} onClick={this.handleSignOut}>Đăng xuất</Button>
				</Col>
			</Row>
		);
	}
}

export default MenuComponent;
