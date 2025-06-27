// src/components/Header.js
import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  PlusOutlined, 
  DashboardOutlined, 
  BulbOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/" onClick={() => setVisible(false)}>Home</Link> },
    { key: '/submit', icon: <PlusOutlined />, label: <Link to="/submit" onClick={() => setVisible(false)}>Submit</Link> },
    { key: '/admin', icon: <DashboardOutlined />, label: <Link to="/admin" onClick={() => setVisible(false)}>Admin</Link> }
  ];

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'sticky',
      top: 0,
      zIndex: 1
    }}>
      {/* Logo/Brand Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BulbOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          FeedbackHub
        </span>
      </div>

      {/* Desktop Menu - Hidden on mobile */}
      <div className="desktop-menu" style={{ display: 'none', flex: 1 }}>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          selectedKeys={[location.pathname]}
          items={menuItems} 
          style={{ 
            minWidth: 0, 
            justifyContent: 'center',
            borderBottom: 'none'
          }} 
        />
      </div>

      {/* Mobile Hamburger Button - Hidden on desktop */}
      <div className="mobile-menu-button" style={{ display: 'none' }}>
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={() => setVisible(true)}
          style={{ 
            color: 'white',
            fontSize: '16px',
            width: 48,
            height: 48
          }}
        />
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <Space>
            <BulbOutlined style={{ color: '#1890ff' }} />
            <span>FeedbackHub</span>
          </Space>
        }
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        headerStyle={{ background: '#001529', color: 'white' }}
        bodyStyle={{ background: '#001529', padding: 0 }}
        drawerStyle={{ background: '#001529' }}
      >
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 'none', padding: '8px 0' }}
        />
      </Drawer>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: block !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
      `}</style>
    </AntHeader>
  );
};

export default Header;