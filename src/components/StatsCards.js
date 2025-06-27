// src/components/StatsCards.js
import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { BulbOutlined, ExclamationCircleOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Total Feedbacks"
            value={stats.total}
            prefix={<BulbOutlined style={{ color: '#1890ff' }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Open"
            value={stats.byStatus?.open || 0}
            prefix={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="In Progress"
            value={stats.byStatus?.inProgress || 0}
            prefix={<ClockCircleOutlined style={{ color: '#722ed1' }} />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Completed"
            value={stats.byStatus?.done || 0}
            prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;