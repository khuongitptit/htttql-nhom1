import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import routes from './routes';
import './App.scss';
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
