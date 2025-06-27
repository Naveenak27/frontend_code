// src/components/FeedbackCard.js
import React from 'react';
import { Card, Tag, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { LikeOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { formatDistanceToNow, isValid } from 'date-fns';
import { getStatusColor, getCategoryColor, truncateText } from '../utils/helpers';

const { Title, Text } = Typography;

const FeedbackCard = ({ feedback, onUpvote }) => {
  console.log(feedback);
  
  return (
    <Card
      style={{ 
        marginBottom: 16, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      bodyStyle={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 57px)', // Subtract actions height
        flex: 1
      }}
      actions={[
        <Link to={`/feedback/${feedback.id}`} key="view">
          <Button type="text" icon={<EyeOutlined />}>View Details</Button>
        </Link>,
        <Button 
          key="upvote"
          type="text" 
          icon={<LikeOutlined />} 
          onClick={() => onUpvote(feedback.id)}
        >
          {feedback.upvotes}
        </Button>
      ]}
      hoverable
    >
      {/* Tags */}
      <Space style={{ marginBottom: 12 }}>
        <Tag color={getStatusColor(feedback.status)}>{feedback.status}</Tag>
        <Tag color={getCategoryColor(feedback.category)}>{feedback.category}</Tag>
      </Space>
      
      {/* Title - Fixed height with proper text handling */}
      <Title 
        level={4} 
        style={{ 
          marginBottom: 8, 
          marginTop: 0,
          minHeight: '60px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
        title={feedback.title} // Tooltip on hover
      >
        {feedback.title}
      </Title>
      
      {/* Description - Flexible height with proper text handling */}
      <div style={{ flex: 1, marginBottom: 16 }}>
        <Text 
          type="secondary" 
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5'
          }}
          title={feedback.description} // Tooltip on hover
        >
          {truncateText(feedback.description, 150)}
        </Text>
      </div>
      
      {/* Footer - Time and upvotes info */}
      <div style={{ 
        marginTop: 'auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid #f0f0f0',
        paddingTop: 8
      }}>
        <Space size="small">
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {feedback.created_at && isValid(new Date(feedback.created_at))
              ? formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })
              : 'Unknown time'
            }
          </Text>
        </Space>
        
        <Text strong style={{ color: '#1890ff', fontSize: '12px' }}>
          {feedback.upvotes} upvotes
        </Text>
      </div>
    </Card>
  );
};

export default FeedbackCard;