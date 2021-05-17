import React, { Component } from 'react';
import _ from 'lodash';
import MenuComponent from './MenuComponent';
import { getAllProducts, addProducts, updateProduct, removeProduct } from '../firebase/admin';
import { Table, Button, Select, Row, Col, Modal, Form, Input, Upload, message, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { uploadFile } from '../firebase/admin';
import { getProduct } from '../firebase/client';
import { Redirect } from 'react-router-dom';
const { Option } = Select;
class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			category: 'all',
			products: [],
			modalVisible: false,
			fileList: [],
			previewTitle: '',
			previewPhoto: '',
			previewVisible: false,
			editingProduct: {},
		};
	}
	updateProducts = (category, filter) => {
		getProduct(category, filter).then(products => {
			this.setState({ products });
		});
	};
	componentDidMount() {
		this.updateProducts('all');
	}
	handleEditProduct = product => {
		this.setState({ editingProduct: product });
		this.setState({ modalVisible: true });
	};
	handleRemoveProduct = productId => {
		removeProduct(productId)
			.then(res => {
				message.success({ content: 'Xóa hàng thành công' });
				this.updateProducts();
			})
			.catch(err => {
				message.error({ content: 'Xóa hàng không thành công' });
			});
	};
	renderTable = () => {
		const columns = [
			{
				title: 'Tên',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Danh mục',
				dataIndex: 'category',
				key: 'category',
				render: (record, index) => {
					const mapping = {
						phone: 'Điện thoại',
						laptop: 'Laptop',
						accessories: 'Phụ kiện',
					};
					return <span>{mapping[record]}</span>;
				},
			},
			{
				title: 'Giá',
				dataIndex: 'price',
				key: 'price',
			},
			{
				title: 'Số lượng',
				dataIndex: 'quantity',
				key: 'quantity',
			},
			{
				title: 'Hành động',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => {
					return (
						<div>
							<Button onClick={() => this.handleEditProduct(record)}>
								<EditOutlined />
							</Button>
							<Button style={{ marginLeft: '10px' }} onClick={() => this.handleRemoveProduct(record.id)}>
								<DeleteOutlined />
							</Button>
						</div>
					);
				},
			},
		];
		return <Table dataSource={this.state.products} columns={columns} pagination={false} />;
	};

	onFinish = async values => {
		if (this.state.editingProduct.id) {
			const data = _.assign(values, { id: this.state.editingProduct.id });
			updateProduct(data)
				.then(res => {
					message.success({ content: 'Chỉnh sửa hàng thành công' });
					this.updateProducts();
				})
				.catch(err => {
					message.error({ content: 'Chỉnh sửa hàng không thành công' });
				});
		} else {
			const fileList = _.get(values, 'photos.fileList') || [];
			const photoURLs = await Promise.all(
				fileList.map(file => {
					return uploadFile(file.originFileObj);
				})
			);
			const data = _.assign(values, { photos: photoURLs });
			addProducts(data)
				.then(res => {
					message.success({ content: 'Thêm hàng thành công' });
					this.updateProducts();
				})
				// .catch(err => {
				// 	message.error({ content: 'Thêm hàng không thành công' });
				// });
		}
		this.setState({ modalVisible: false });
	};

	beforeUpload = file => {
		this.setState({ fileList: [...this.state.fileList, file] });
		return false;
	};
	getBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	};

	handleFileListChange = ({ fileList }) => {
		this.setState({ fileList });
	};
	handleAdd = () => {
		this.setState({ editingProduct: {} });
		this.setState({ modalVisible: true });
	};
	handleChangeCategory = value => {
		this.setState({ category: value });
		getProduct(value, this.state.search).then(products => {
			this.setState({ products });
		});
	};
	handleChangeSearch = e => {
		this.setState({ search: e.target.value });
	};
	handleSearch = () => {
		this.updateProducts(this.state.category, this.state.search);
	};
	render() {
    const admin = JSON.parse(localStorage.getItem('admin')) || {};
		if (_.isEmpty(admin)) {
			return <Redirect to="/admin-login" />;
    }
		const layout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 },
		};
		const tailLayout = {
			wrapperCol: { offset: 8, span: 16 },
		};
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		return (
			<div style={{ textAlign: 'center' }}>
				<MenuComponent />
				<h1 style={{ marginTop: '20px' }}>Quản lý hàng hóa</h1>
				<Row style={{ width: '300px', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
					<Col span={8}>
						<Select defaultValue="phone" onChange={this.handleChangeCategory}>
							<Option value="all">Tất cả</Option>
							<Option value="phone">Phone</Option>
							<Option value="laptop">Laptop</Option>
							<Option value="a">aaa</Option>
						</Select>
					</Col>
					<Col span={8}>
						<Input onChange={this.handleChangeSearch} placeholder="Nhập tên"/>
					</Col>
					<Col span={8}>
						<Button type="primary" onClick={this.handleSearch}>
							Tìm kiếm
						</Button>
					</Col>
				</Row>

				<div style={{ marginTop: '20px' }}>
					<Button type="primary" onClick={this.handleAdd}>
						Thêm hàng hóa
					</Button>
				</div>
				<Modal
					destroyOnClose={true}
					title="Thêm hàng hóa"
					visible={this.state.modalVisible}
					footer={null}
					onCancel={this.handleCancel}
				>
					<Form
						initialValues={this.state.editingProduct.id ? this.state.editingProduct : { category: 'phone' }}
						name="product-add"
						onFinish={this.onFinish}
						{...layout}
					>
						<Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Please input name' }]}>
							<Input />
						</Form.Item>

						<Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please input category' }]}>
							<Select defaultValue="phone">
								<Option value="phone">Điện thoại</Option>
								<Option value="laptop">Laptop</Option>
								<Option value="accessories">Phụ kiện</Option>
							</Select>
						</Form.Item>
						<Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Please input price' }]}>
							<Input />
						</Form.Item>
						<Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Please input quantity' }]}>
							<InputNumber />
						</Form.Item>
						<Form.Item label="Hình ảnh" name="photos">
							<Upload
								listType="picture-card"
								fileList={this.state.fileList}
								onPreview={this.onPreviewImage}
								onChange={this.handleFileListChange}
								beforeUpload={this.beforeUpload}
							>
								{this.state.fileList.length >= 5 ? null : uploadButton}
							</Upload>
						</Form.Item>
						<Form.Item label="Mô tả" name="description">
							<Input.TextArea />
						</Form.Item>
						<Form.Item {...tailLayout}>
							<Button onClick={() => this.setState({ modalVisible: false })}>Hủy</Button>
							<Button type="primary" htmlType="submit">
								OK
							</Button>
						</Form.Item>
					</Form>
				</Modal>
				<div style={{ marginTop: '50px' }}>{this.renderTable()}</div>
			</div>
		);
	}
}

export default Product;
