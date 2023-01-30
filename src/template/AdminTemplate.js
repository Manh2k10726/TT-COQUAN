import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import {Breadcrumb, Layout, Menu ,Button} from 'antd';
import {
  HomeOutlined,ProfileOutlined,FileProtectOutlined,ApartmentOutlined,CalendarOutlined
  ,BarChartOutlined,SnippetsOutlined ,FileSyncOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './AdminTemplate.css';
import { Route } from 'react-router';

const { Header, Footer, Sider, Content } = Layout;


export default function AdminTemplate(props) {
const { Component, ...restRoute } = props;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return <Route {...restRoute} render={(propsRoute) => {
  return<>
        <Layout>
            <Header  className="header" style={{ padding: 10 }} >
                <div className="logo-admin" />
                <div>
                    <Menu title='demo' theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                </div>
            </Header>
        </Layout>
        <Layout>
        <Sider style={{ marginTop: 5 ,height:'100%'}} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
        >
            <Menu.Item key="/">
            <HomeOutlined />
            <span>Trang chủ</span>
            <Link to="/home"></Link>
            </Menu.Item>
            <Menu.Item key="/users">
            <CalendarOutlined />
            <span>Lịch cơ quan</span>
            <Link to="/company-work-schedule"></Link>
            </Menu.Item>
            <SubMenu
                    title={
                    <span>
                        <ProfileOutlined />
                        <span>Nhiệm vụ</span>
                    </span>
                    }
                >
                    <Menu.ItemGroup key='AboutUS' title='Country 1'>
                    <Menu.Item key='location'> Nhiệm vụ</Menu.Item>
                    <Menu.Item key='location0'> Lãnh đạo</Menu.Item>
                    </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="/counter">
            <SnippetsOutlined />
            <span>Công việc</span>
            <Link to="/counter"></Link>
            </Menu.Item>
            <SubMenu
                    title={
                    <span>
                        <BarChartOutlined />
                        <span>Bảng lương</span>
                    </span>
                    }
                >
                    <Menu.ItemGroup key='AboutUS' title='Country 1'>
                    <Menu.Item key='location1'> Lương của tôi</Menu.Item>
                    </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
                    title={
                    <span>
                        <FileProtectOutlined />
                        <span>Hành chính</span>
                    </span>
                    }
                >
                    <Menu.ItemGroup key='AboutUS' title='Country 1'>
                    <Menu.Item key='location2'>Hành chính</Menu.Item>
                    <Menu.Item key='location3'>Phiếu rủi ro</Menu.Item>
                    <Menu.Item key='location4'> Tạm ứng</Menu.Item>
                    </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
                    title={
                    <span>
                        <FileSyncOutlined />
                        <span>Tiện ích</span>
                    </span>
                    }
                >
                    <Menu.ItemGroup key='AboutUS' >
                    <Menu.Item key='location5'> Danh bạ</Menu.Item>
                    <Menu.Item key='location6'> Thông báo chung</Menu.Item>
                    <Menu.Item key='location7'>Tài liệu ISO</Menu.Item>
                    <Menu.Item key='location8'>VB pháp chế</Menu.Item>
                    <Menu.Item key='location9'> Ký số điện tử</Menu.Item>
                    <Menu.Item key='location10'>Tin nhắn liên thông</Menu.Item>
                    <Menu.Item key='location11'>Tin nhắn nội bộ</Menu.Item>
                    </Menu.ItemGroup>
            </SubMenu>
            <SubMenu
                    title={
                    <span>
                        <ApartmentOutlined />
                        {/* <Icon type="mail" /> */}
                        <span>Quản trị</span>
                    </span>
                    }
                >
                    <Menu.ItemGroup key='AboutUS' >
                    <Menu.Item key='location12'> Nhóm người dùng</Menu.Item>
                    <Menu.Item key='location13'> Tài khoản ký số</Menu.Item>
                    </Menu.ItemGroup>
            </SubMenu>
        </Menu>
        </Sider>
        <Layout
            style={{
            padding: '0 24px 24px',
            }}
        >
            <Breadcrumb
            style={{
                margin: '16px 0',
            }}
            >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
            >
            <Component {...propsRoute} />
            </Content>
        </Layout>
        </Layout>
    </>
    
}} />
}