import Order from '../admin/Order';
import Product from '../admin/Product';
import Customer from '../admin/Customer';
import Statistic from '../admin/Statistic';

export default [
  {
    path: '/admin/order',
    exact: true,
    component: () => <Order/>
  },
  {
    path: '/admin/product',
    exact: true,
    component: () => <Product/>
  },
  {
    path: '/admin/customer',
    exact: true,
    component: () => <Customer/>
  },
  {
    path: '/admin/statistic',
    exact: true,
    component: () => <Statistic/>
  }
]