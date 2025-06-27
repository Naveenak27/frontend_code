// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Select, Typography, message, Row, Col, Statistic, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { DashboardOutlined, BulbOutlined, CheckCircleOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { feedbackApi } from '../services/api';
import { getStatusColor, getCategoryColor } from '../utils/helpers';

const { Title } = Typography;
const { Option } = Select;

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbackRes, statsRes] = await Promise.all([
        feedbackApi.getFeedbacks({}),
        feedbackApi.getStats()
      ]);
      setFeedbacks(feedbackRes.data.data || []);
      setStats(statsRes.data.data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (feedbackId, newStatus) => {
    try {
      await feedbackApi.updateStatus(feedbackId, newStatus);
      message.success('Status updated successfully!');
      setFeedbacks(prev => 
        prev.map(feedback => 
          feedback.id === feedbackId ? { ...feedback, status: newStatus } : feedback
        )
      );
      // Refresh stats
      const statsRes = await feedbackApi.getStats();
      setStats(statsRes.data.data);
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/feedback/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusUpdate(record.id, newStatus)}
          style={{ width: '100%' }}
        >
          <Option value="Open">Open</Option>
          <Option value="Planned">Planned</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      ),
    },
    {
      title: 'Upvotes',
      dataIndex: 'upvotes',
      key: 'upvotes',
      sorter: (a, b) => a.upvotes - b.upvotes,
      render: (upvotes) => <Tag color="blue">{upvotes}</Tag>,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (date) => (
        <span>
          {date ? formatDistanceToNow(new Date(date), { addSuffix: true }) : 'Unknown'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Link to={`/feedback/${record.id}`}>
            <Button type="text" icon={<EyeOutlined />} size="small">
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        <DashboardOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        Admin Dashboard
      </Title>

      {stats && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Feedbacks"
                value={stats.total}
                prefix={<BulbOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Open"
                value={stats.byStatus?.open || 0}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="In Progress"
                value={stats.byStatus?.inProgress || 0}
                prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Completed"
                value={stats.byStatus?.done || 0}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
        </Row>
      )}

      <Card>
        <Table
          columns={columns}
          dataSource={feedbacks}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 700 }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;