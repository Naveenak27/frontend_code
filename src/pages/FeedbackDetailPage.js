// src/pages/FeedbackDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, Typography, Tag, Button, Space, List, Avatar, 
  Input, Form, message, Spin, Divider 
} from 'antd';
import { ArrowLeftOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import { feedbackApi } from '../services/api';
import { getStatusColor, getCategoryColor } from '../utils/helpers';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const FeedbackDetailPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await feedbackApi.getFeedback(id);
      setFeedback(response.data.data);
    } catch (error) {
      message.error('Failed to fetch feedback details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      await feedbackApi.upvoteFeedback(id);
      message.success('Upvoted successfully!');
      setFeedback(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
    } catch (error) {
      message.error('Failed to upvote');
    }
  };

  const handleAddComment = async (values) => {
    try {
      setCommentLoading(true);
      await feedbackApi.addComment(id, values);
      message.success('Comment added successfully!');
      form.resetFields();
      fetchFeedback();
    } catch (error) {
      message.error('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!feedback) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Feedback not found</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/">
          <Button icon={<ArrowLeftOutlined />}>Back to Feedbacks</Button>
        </Link>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Tag color={getStatusColor(feedback.status)}>{feedback.status}</Tag>
            <Tag color={getCategoryColor(feedback.category)}>{feedback.category}</Tag>
          </Space>
        </div>

        <Title level={2} style={{ marginBottom: 16 }}>
          {feedback.title}
        </Title>

        <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
          {feedback.description}
        </Paragraph>

        <Divider />

        <div style={{ textAlign: 'right' }}>
          <Button type="primary" icon={<LikeOutlined />} onClick={handleUpvote} size="large">
            Upvote ({feedback.upvotes})
          </Button>
        </div>
      </Card>

      <Card title={`Comments (${feedback.comments?.length || 0})`}>
        <Form form={form} onFinish={handleAddComment} style={{ marginBottom: 24 }}>
          <Form.Item
            name="author"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>
          
          <Form.Item
            name="comment"
            rules={[{ required: true, min: 5, message: 'Comment must be at least 5 characters' }]}
          >
            <TextArea rows={4} placeholder="Add your comment..." maxLength={500} showCount />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={commentLoading}>
              Add Comment
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        {feedback.comments && feedback.comments.length > 0 ? (
          <List
            dataSource={feedback.comments}
            renderItem={(comment) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={comment.author || 'Anonymous'}
                  description={
                    <div>
                      <Paragraph>{comment.comment}</Paragraph>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {comment.created_at || 'Just now'}
                      </Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">No comments yet. Be the first to comment!</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FeedbackDetailPage;