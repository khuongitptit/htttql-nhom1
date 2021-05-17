import React, { Component } from 'react';
import {Menu} from 'antd';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {
  render() {
    return (
      <Menu mode="horizontal" style={{textAlign: 'center'}}>
        <Menu.Item key="order" >
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
    )
  }
}

export default MenuComponent;