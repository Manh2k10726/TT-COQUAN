import React from 'react'
import { createBrowserHistory } from 'history';
import { Switch, Router, Route } from 'react-router';
import Login from './pages/Admin/Login';
import Home from './pages/Admin/Home';
import AdminTemplate from './template/AdminTemplate';
import Lichcoquan from './pages/Admin/lichcoquan/lichcoquan';
import ChiTietSuKien from './pages/Admin/lichcoquan/chitietsukien';

export const history = createBrowserHistory();
export default function App() {
  return (
    // <Login/>
    <Router history={history}>
      <Switch>
        <Route path={'/login'} exact component={Login} />
        {/* <Route path={'/Home'} exact component={Home} /> */}
        
        <AdminTemplate path={`/Home`} exact Component={Home} />
        <AdminTemplate path={`/company-work-schedule`} exact Component={Lichcoquan} />
        <AdminTemplate path={`/company-work-schedule/view/:id`} exact Component={ChiTietSuKien} />
      </Switch>
    </Router>
  )
};
