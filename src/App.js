import React from 'react'
import { createBrowserHistory } from 'history';
import { Switch, Router, Route } from 'react-router';
import Login from './pages/Admin/Login';
import Home from './pages/Admin/Home';
import AdminTemplate from './template/AdminTemplate';
import Lichcoquan from './pages/Admin/lichcoquan/lichcoquan';
import ChiTietSuKien from './pages/Admin/lichcoquan/chitietsukien';
import EditChiTietSuKien from './pages/Admin/lichcoquan/Editlichcoquan';
import CreateChiTietSuKien from './pages/Admin/lichcoquan/CreateLichCoQuan';
import ThongBaoChung from './pages/Admin/TienIch/ThongBaoChung/ThongBao';
import NewsDetail from './pages/Admin/TienIch/ThongBaoChung/NewsDetail';
import CreateNews from './pages/Admin/TienIch/ThongBaoChung/CreateNew';
import EditNews from './pages/Admin/TienIch/ThongBaoChung/EditNews';

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
        <AdminTemplate path={`/company-work-schedule/views/:id`} exact Component={EditChiTietSuKien} />
        <AdminTemplate path={`/company-work-schedule/create`} exact Component={CreateChiTietSuKien} />
        <AdminTemplate path={`/utility/general-notifications`} exact Component={ThongBaoChung} />
        <AdminTemplate path={`/utility/general-notifications/view/:id`} exact Component={NewsDetail} />
        <AdminTemplate path={`/utility/general-notifications/create`} exact Component={CreateNews} />
        <AdminTemplate path={`/utility/general-notifications/update/:id`} exact Component={EditNews} />
      </Switch>
    </Router>
  )
};
