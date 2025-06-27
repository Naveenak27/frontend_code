// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Typography, Spin, message, Row, Col, Card, Select, Space, Input, Button, Empty } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import FeedbackCard from '../components/FeedbackCard';
import StatsCards from '../components/StatsCards';
import { feedbackApi } from '../services/api';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

const HomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [feedbackRes, statsRes] = await Promise.all([
        feedbackApi.getFeedbacks(filters),
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

  const handleUpvote = async (id) => {
    try {
      await feedbackApi.upvoteFeedback(id);
      setFeedbacks(prev => 
        prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f)
      );
      message.success('Upvoted successfully!');
    } catch (error) {
      message.error('Failed to upvote');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const clearAllFilters = () => {
    setFilters({});
    message.success('All filters cleared');
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        Welcome to FeedbackHub
      </Title>
      
      <StatsCards stats={stats} />

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Search Bar */}
          <Search
            placeholder="Search feedback by title or description..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
          />
          
          {/* Filters Row */}
          <Space wrap style={{ justifyContent: 'space-between', width: '100%' }}>
            <Space wrap>
              <Select 
                placeholder="Filter by Status" 
                style={{ width: 150 }} 
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                allowClear
              >
                <Option value="Open">Open</Option>
                <Option value="Planned">Planned</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
              
              <Select 
                placeholder="Filter by Category" 
                style={{ width: 150 }} 
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                allowClear
              >
                <Option value="Feature">Feature</Option>
                <Option value="Bug">Bug</Option>
                <Option value="UI">UI</Option>
                <Option value="Enhancement">Enhancement</Option>
              </Select>
              
              <Select 
                placeholder="Sort by" 
                style={{ width: 150 }}
                value={filters.sort}
                onChange={(value) => handleFilterChange('sort', value)}
              >
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
                <Option value="upvotes">Most Upvoted</Option>
              </Select>
            </Space>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button 
                type="default" 
                icon={<ClearOutlined />}
                onClick={clearAllFilters}
                style={{ marginLeft: 'auto' }}
              >
                Clear Filters
              </Button>
            )}
          </Space>
        </Space>
      </Card>

      <Spin spinning={loading}>
        {feedbacks.length === 0 && !loading ? (
          <Card>
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Title level={4} type="secondary">No feedback found</Title>
                  <p style={{ color: '#999' }}>
                    {hasActiveFilters 
                      ? 'No feedback matches your current filters. Try adjusting your search criteria or clear filters to see all feedback.'
                      : 'No feedback available at the moment. Be the first to share your thoughts!'
                    }
                  </p>
                </div>
              }
            />
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {feedbacks.map(feedback => (
              <Col xs={24} md={12} lg={8} key={feedback.id}>
                <FeedbackCard feedback={feedback} onUpvote={handleUpvote} />
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default HomePage;