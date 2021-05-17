import Order from '../admin/Order';
import Product from '../admin/Product';
import Customer from '../admin/Customer';
import Statistic from '../admin/Statistic';
import Login from '../client/Login';
import AdminLogin from '../admin/AdminLogin';
import Register from '../client/Register';
import Home from '../client/Home'
import ProductDetail from '../client/ProductDetail';
import Checkout from '../client/Checkout';
export default [
  //admin
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
    path: '/admin/login',
    exact: true,
    component: () => <AdminLogin/>
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
  },
  //customer
  {
    path: '/login',
    exact: true,
    component: ({history}) => <Login history={history} />
  },
  {
    path: '/register',
    exact: true,
    component: ({history}) => <Register history={history} />
  },
  {
    path: '/',
    exact: true,
    component: ({match}) => <Home match={match}/>
  },
  {
    path: '/checkout',
    exact: true,
    component: () => <Checkout />
  },
  {
    path: '/:productId',
    exact: true,
    component: ({match}) => <ProductDetail match={match}/>
  },
]