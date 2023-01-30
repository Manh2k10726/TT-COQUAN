import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import {Breadcrumb, Layout, Menu ,Button} from 'antd';
// import {
//   HomeOutlined,ProfileOutlined,FileProtectOutlined,
//   DashboardOutlined,ApartmentOutlined,CalendarOutlined,
//   TeamOutlined,BarChartOutlined,SnippetsOutlined ,FileSyncOutlined
// } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Home.css'

const { Header, Footer, Sider, Content } = Layout;


const Home = () => {
 
  return (
    <>
        Chào mừng trở lại hệ thống 
    </>
    
  );
};

export default Home ;