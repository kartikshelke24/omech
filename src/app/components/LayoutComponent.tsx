// src/components/LayoutComponent.tsx
'use client'
import React from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import Link from 'next/link';
import {
  DashboardOutlined,
  DatabaseOutlined,
  StockOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  BuildOutlined,
  UsergroupAddOutlined,
  SyncOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="demo-logo" style={{ color: 'white', padding: '16px', fontSize: '18px', textAlign: 'center' }}>
          Manufacturing System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
        >
          {/* Sidebar Menu Items */}
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu key="management" icon={<DatabaseOutlined />} title="Management">
            <Menu.Item key="products">
              <Link href="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="inventory">
              <Link href="/inventory">Inventory</Link>
            </Menu.Item>
            <Menu.Item key="production">
              <Link href="/production">Production</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            <Link href="/orders">Orders</Link>
          </Menu.Item>
          <Menu.SubMenu key="resources" icon={<BuildOutlined />} title="Resources">
            <Menu.Item key="materials">
              <Link href="/materials">Materials</Link>
            </Menu.Item>
            <Menu.Item key="suppliers">
              <Link href="/suppliers">Suppliers</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="transactions" icon={<SyncOutlined />}>
            <Link href="/transactions">Transactions</Link>
          </Menu.Item>
          <Menu.Item key="reports" icon={<BarChartOutlined />}>
            <Link href="/reports">Reports</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link href="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: colorBgContainer, padding: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, paddingLeft: 24, fontSize: 18 }}>
            {/* Optional: Add your logo here */}
            <span>Manufacturing System</span>
          </div>
          {/* Placeholder for User Profile, Notifications, etc. */}
        </Header>

        <Content style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Manufacturing System ©{new Date().getFullYear()} Created by Your Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
