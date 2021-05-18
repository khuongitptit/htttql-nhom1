import React, { Component } from 'react';
import _ from 'lodash';
import MenuComponent from './MenuComponent';
import { getAllProducts, addProducts, updateProduct, removeProduct, confirmOrder } from '../firebase/admin';
import { Table, Button, Select, Row, Col, Modal, Form, Input, Upload, message, InputNumber } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { uploadFile, getOrders } from '../firebase/admin';
import { Redirect } from 'react-router-dom';
const { Option } = Select;
class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
      redirect: false,
			search: '',
			orders: [],
		};
	}
	updateOrders = filter => {
		getOrders(filter).then(orders => {
			this.setState({ orders });
		});
	};
	componentDidMount() {
		this.updateOrders();
	}
	handleConfirm = orderId => {
		confirmOrder(orderId)
			.then(res => {
				message.success({ content: 'Xác nhận đơn hàng thành công' });
				this.updateOrders();
			})
			.catch(err => {
				message.error({ content: 'Đã có lỗi' });
			});
  };
	renderTable = () => {
		const columns = [
			{
				title: 'Tên khách hàng',
				dataIndex: 'customer.name',
				key: 'customer.name',
				render: (text, record) => {
					return record.customer.name;
				},
      },
      {
				title: 'Điện thoại',
				dataIndex: 'customer.phone',
				key: 'customer.phone',
				render: (text, record) => {
					return record.info.phone;
				},
      },
      {
				title: 'Email',
				dataIndex: 'customer.email',
				key: 'customer.email',
				render: (text, record) => {
					return record.info.email;
				},
      },
      {
				title: 'Địa chỉ',
				dataIndex: 'customer.address',
				key: 'customer.address',
				render: (text, record) => {
          console.log("record",record);
          const address = record.info;
					return `${_.get(address, 'address', '')}, ${_.get(address, 'commune', '')}, ${_.get(address, 'district', '')}, ${_.get(address, 'city', '')}`;
				},
			},
			{
				title: 'Hàng đặt',
				dataIndex: 'orderItem',
				key: 'orderItem',
				render: (text, record) => {
					return (
						<div>
							{record.orderItems.map(orderItem => {
								return (
									<Row style={{ marginTop: '5px'}}>
                    <Col span={10}><img style={{maxWidth: '50px'}} src={_.head(_.get(orderItem, 'product.photos'))}/></Col>
										<Col span={10}>{_.get(orderItem, 'product.name')}</Col>
                    <Col span={2}>X</Col>
										<Col span={2}>{_.get(orderItem, 'quantity')}</Col>
									</Row>
								);
							})}
						</div>
					);
        },
        width: 400
			},
			{
				title: 'Thành tiền',
				dataIndex: 'total',
        key: 'total',
        render: (text,record) => {
          const total = _.sumBy(record.orderItems, orderItem => {
            return _.get(orderItem, 'product.price') * _.get(orderItem, 'quantity');
          });
          return total;
        },
        width: 100
      },
      {
				title: 'Trạng thái',
				dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
          const mapping = {
            waiting: 'Đang chờ',
            ok: 'Đã xác nhận'
          }
          return mapping[record.status];
        }
			},
			{
				title: 'Hành động',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => {
					return (
						<div>
							{record.status === 'waiting' && <Button onClick={() => this.handleConfirm(record.id)}>
              <CheckCircleOutlined />
							</Button>}
						</div>
					);
				},
			},
		];
		return <Table dataSource={this.state.orders} columns={columns} pagination={false} />;
	};
	handleChangeSearch = e => {
		this.setState({ search: e.target.value });
	};
	handleSearch = () => {
		this.updateOrders(this.state.search);
	};
	render() {
    const admin = JSON.parse(localStorage.getItem('admin')) || {};
		if (_.isEmpty(admin)) {
			return <Redirect to="/admin/login" />;
    }
		return (
			<div style={{ textAlign: 'center' }}>
				<MenuComponent />
				<h1 style={{ marginTop: '20px' }}>Quản lý đơn hàng</h1>
				<Row style={{ width: '400px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
					<Col span={12}>
						<Input onChange={this.handleChangeSearch} placeholder="Nhập tên khách hàng" />
					</Col>
					<Col span={12}>
						<Button type="primary" onClick={this.handleSearch}>
							Tìm kiếm
						</Button>
					</Col>
				</Row>
				<div style={{ marginTop: '50px' }}>{this.renderTable()}</div>
			</div>
		);
	}
}

export default Order;
