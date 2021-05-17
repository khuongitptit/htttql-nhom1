import React, { Component } from 'react';
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom';
import { getCart } from '../firebase/client';

class Header extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      search: '',
      redirectLogin: false,
      redirectHome: false,
    }
  }
  handleSignOut = () => {
    localStorage.removeItem('user');
    this.setState({redirectLogin: true}, () => this.setState({redirectLogin: false}))
  }
  handleChangeSearch = e => {
    this.setState({search: e.target.value});
  }
  handleSearch = () => {
    this.setState({redirectHome: true}, () => this.setState({redirectHome: false}))
  }
  render() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if(this.state.redirectLogin) {
      return <Redirect to="login"/>
    }
    if(this.state.redirectHome) {
      return <Redirect to={`?search=${this.state.search}`} />
    }
    const total = _.sumBy(this.props.cart, cartItem => {
      return _.get(cartItem, 'product.price') * _.get(cartItem, 'quantity');
    })
    return (
      <header>
          <div id="top-header">
            <div class="container">
              <ul class="header-links pull-left">
                <li>
                  <a href="#">
                    <i class="fa fa-phone"></i> 0999999999
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-envelope-o"></i> gnouhk@email.com
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-map-marker"></i> ok
                  </a>
                </li>
              </ul>
              <ul class="header-links pull-right">
                <li>
                  {!_.isEmpty(user) ? <span onClick={this.handleSignOut} style={{color: 'white', cursor: 'pointer'}}>Đăng xuất khỏi {user.username}</span> : <Link to="login">Đăng nhập</Link>}
                </li>
              </ul>
            </div>
          </div>
          <div id="header">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="header-logo">
                    <Link to="" class="logo">
                      <img src="./img/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="header-search">
                    <form>
                      <input class="input" placeholder="Nhập tên" onChange={this.handleChangeSearch}/>
                      <button class="search-btn" onClick={this.handleSearch}>Tìm kiếm</button>
                    </form>
                  </div>
                </div>
                <div class="col-md-3 clearfix">
                  <div class="header-ctn">
                    <div class="dropdown">
                      <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                        <i class="fa fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                        <div class="qty">{_.size(this.props.cart)}</div>
                      </a>
                      <div class="cart-dropdown">
                        <div class="cart-list">
                          {!_.isEmpty(this.props.cart) || !_.isNil(this.props.cart) ? this.props.cart.map(cartItem => {
                            return <div class="product-widget">
                            <div class="product-img">
                              <img src={_.head(_.get(cartItem, 'product.photos'))} alt="" />
                            </div>
                            <div class="product-body">
                              <h3 class="product-name">
                                <a href="#">{_.get(cartItem, 'product.name')}</a>
                              </h3>
                              <h4 class="product-price">
                                <span class="qty">{_.get(cartItem, 'quantity')}x</span>{_.get(cartItem, 'product.price')}
                              </h4>
                            </div>
                          </div>
                          }) : null
                        }
                        </div>
                        <div class="cart-summary">
                          <small>{`Tổng số: ${_.size(this.props.cart)}`}</small>
                          <h5>{`THÀNH TIỀN: ${total}`}</h5>
                        </div>
                        <div class="cart-btns">
                          <Link to="checkout">
                            Thanh toán <i class="fa fa-arrow-circle-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="menu-toggle">
                      <a href="#">
                        <i class="fa fa-bars"></i>
                        <span>Menu</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    );
  }
}

export default Header;