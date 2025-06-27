// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SubmitFeedbackPage from './pages/SubmitFeedbackPage';
import FeedbackDetailPage from './pages/FeedbackDetailPage';
import AdminDashboard from './pages/AdminDashboard';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content style={{ padding: '20px', minHeight: 'calc(100vh - 134px)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitFeedbackPage />} />
          <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
