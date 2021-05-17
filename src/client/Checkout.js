import React, { Component } from 'react';
import _ from 'lodash';
import Footer from './Footer';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { getCart, order } from '../firebase/client';
import { message } from 'antd';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
      redirect: false,
			info: {},
			cart: [],
		};
	}

	componentDidMount() {
		const user = JSON.parse(localStorage.getItem('user')) || {};
		if (_.isEmpty(user)) {
			return;
		}
		getCart(user.id).then(cart => {
			this.setState({ cart });
		});
	}
	changeInfo = (field, value) => {
		this.setState({ info: { ...this.state.info, [field]: value } });
	};
	handleOK = () => {
		const user = JSON.parse(localStorage.getItem('user')) || {};
		order({
			userId: user.id,
			info: this.state.info,
      items: this.state.cart,
      status: 'waiting'
		})
			.then(res => {
        message.success({ content: 'Đặt hàng thành công' });
        this.setState({redirect: true},() => this.setState({redirect: false}))
			})
			.catch(err => {
				message.error({ content: 'Đã có lỗi' });
			});
	};
	render() {
		const user = JSON.parse(localStorage.getItem('user')) || {};
		if (_.isEmpty(user)) {
			return <Redirect to="login" />;
    }
    if(this.state.redirect) {
      return <Redirect to="" />;
    }
		const total = _.sumBy(this.state.cart, cartItem => {
			return _.get(cartItem, 'product.price') * _.get(cartItem, 'quantity');
		});
		return (
			<div>
				<Header />
				<div class="section">
					<div class="container">
						<div class="row">
							<div class="col-md-7">
								<div class="billing-details">
									<div class="section-title">
										<h3 class="title">Địa chỉ nhận</h3>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="text"
											name="name"
											placeholder="Họ và tên"
											onChange={e => this.changeInfo('name', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="email"
											name="email"
											placeholder="Email"
											onChange={e => this.changeInfo('email', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="text"
											name="city"
											placeholder="Tỉnh/ Thành phố"
											onChange={e => this.changeInfo('city', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="text"
											name="district"
											placeholder="Quận/ huyện"
											onChange={e => this.changeInfo('district', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="text"
											name="commune"
											placeholder="Phường/ Xã/ Thị trấn"
											onChange={e => this.changeInfo('commune', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="text"
											name="address"
											placeholder="Địa chỉ chi tiết"
											onChange={e => this.changeInfo('address', e.target.value)}
										/>
									</div>
									<div class="form-group">
										<input
											class="input"
											type="tel"
											name="phone"
											placeholder="Điện thoại"
											onChange={e => this.changeInfo('phone', e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div class="col-md-5 order-details">
								<div class="section-title text-center">
									<h3 class="title">Đơn hàng</h3>
								</div>
								<div class="order-summary">
									<div class="order-col">
										<div>
											<strong>TÊN HÀNG</strong>
										</div>
										<div>
											<strong>THÀNH TIỀN</strong>
										</div>
									</div>
									<div class="order-products">
										{this.state.cart.map(cartItem => {
											return (
												<div class="order-col">
													<div>{_.get(cartItem, 'product.name')}</div>
													<div>{_.get(cartItem, 'product.price') * _.get(cartItem, 'quantity')} đ</div>
												</div>
											);
										})}
									</div>
									<div class="order-col">
										<div>Giao hàng</div>
										<div>
											<strong>FREE</strong>
										</div>
									</div>
									<div class="order-col">
										<div>
											<strong>TỔNG TIỀN</strong>
										</div>
										<div>
											<strong class="order-total">{total} đ</strong>
										</div>
									</div>
								</div>
								<div class="payment-method">
									<div class="input-radio">
										<input type="radio" name="payment" id="payment-1" checked />
										<label for="payment-1">
											<span></span>
											Thanh toán khi nhận hàng
										</label>
										{/* <div class="caption">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div> */}
									</div>
								</div>
								<div class="input-checkbox">
									<input type="checkbox" id="terms" />
									<label for="terms">
										<span></span>
										Tôi đã đọc và đồng ý với <a href="#">điều khoản dịch vụ</a>
									</label>
								</div>
								<a onClick={this.handleOK} class="primary-btn order-submit">
									Xác nhận
								</a>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Checkout;
