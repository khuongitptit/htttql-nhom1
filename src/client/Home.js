import React, { Component } from 'react';
import _ from 'lodash'
import Footer from './Footer';
import Header from './Header';
import {Select} from 'antd';
import ProductItem from './ProductItem';
import {getCart, getProduct} from '../firebase/client'
import { Redirect } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      cart: [],
      products: [],
      category: 'all'
    }
  }
  componentDidMount() {
    const search = new URLSearchParams(window.location.search).get('search');
    getProduct('all',search).then(products => {
      this.setState({products});
    })
    this.updateCart();
  }
  componentDidUpdate() {
    const search = new URLSearchParams(window.location.search).get('search');
    getProduct(this.state.category,search).then(products => {
      this.setState({products});
    })
  }
  updateCart = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if(_.isEmpty(user)) {
      return;
    }
    getCart(user.id).then(cart => {
      this.setState({cart});
    })
  }
  handleChangeCategory = value => {
    this.setState({category: value});
    getProduct(value).then(products => {
      this.setState({products});
    })
  }
	render() {
    // const user = JSON.parse(localStorage.getItem('user'));
    // if(!user) return <Redirect to="login"/>
		return (
			<div>
				<Header cart={this.state.cart}/>
        <div style={{marginBottom: '20px', marginTop: '50px',textAlign:'center'}}>
          <h3>Lọc theo danh mục</h3>
          <Select value={this.state.category} onChange={this.handleChangeCategory}>
          <Select.Option value="all">
              Tất cả
            </Select.Option>
            <Select.Option value="phone">
              Điện thoại
            </Select.Option>
            <Select.Option value="laptop">
              Laptop
            </Select.Option>
            <Select.Option value="accessories">
              Phụ kiện
            </Select.Option>
          </Select>
        </div>
				<div class="section" style={{marginBottom: '50px'}}>
					<div class="container">
						<div
							style={{
								display: 'grid',
								gridGap: '25px',
								gridTemplateColumns: 'repeat(auto-fit, 260px)',
								gridTemplateRows: 'repeat(10, 100px);',
							}}
						>
							{this.state.products.map((product, index) => {
                return <ProductItem product={product} key={index} updateCart={this.updateCart}/>
              })}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
