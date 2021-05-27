import React, { Component } from 'react';
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom';
import {addToCart} from '../firebase/client'
import { message } from 'antd';
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  addToCard = productId => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      this.setState({redirect: true},() => this.setState({redirect: false}));
      return;
    }
    addToCart({userId: user.id,productId, quantity: 1}).then(res => {
      message.success({ content: 'Đã thêm vào giỏ hàng' });
      this.props.updateCart();
    })
    .catch(err => {
      message.error({ content: 'Đã có lỗi' });
    });
  }

	render() {
    const product = _.get(this.props, 'product') || {};
    if(this.state.redirect) return <Redirect to="login"/>
		return (
			<div class="product">
				<div class="product-img product-home-img">
					<img src={_.head(_.get(product ,'photos'))} alt="" />
					<div class="product-label">
						<span class="new">NEW</span>
					</div>
				</div>
				<div class="product-body product-home-body">
					<p class="product-category">{_.get(product,'category')}</p>
					<h3 class="product-name">
						<Link to={`/${product.id}`}>{_.get(product,'name')}</Link>
					</h3>
					<h4 class="product-price">
						{_.get(product,'price')}
					</h4>
					<div class="product-rating">
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
					</div>
					<div class="product-btns">
						<Link to={`/${product.id}`} class="quick-view" >
							<i class="fa fa-eye" style={{color:'black'}}></i>
						</Link>
					</div>
				</div>
				<div class="add-to-cart">
					<button class="add-to-cart-btn" onClick={() => this.addToCard(product.id)}>Thêm vào giỏ
					</button>
				</div>
			</div>
		);
	}
}

export default ProductItem;
