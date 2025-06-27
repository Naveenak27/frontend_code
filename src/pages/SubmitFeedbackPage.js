// src/pages/SubmitFeedbackPage.js
import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BulbOutlined } from '@ant-design/icons';
import { feedbackApi } from '../services/api';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const SubmitFeedbackPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await feedbackApi.createFeedback(values);
      message.success('Feedback submitted successfully!');
      form.resetFields();
      navigate('/');
    } catch (error) {
      message.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        <BulbOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        Submit Your Feedback
      </Title>
      
      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit} size="large">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter a title' },
              { min: 5, message: 'Title must be at least 5 characters' }
            ]}
          >
            <Input placeholder="Enter a descriptive title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter a description' },
              { min: 20, message: 'Description must be at least 20 characters' }
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Provide detailed information about your feedback..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Option value="Feature">Feature Request</Option>
              <Option value="Bug">Bug Report</Option>
              <Option value="UI">UI/UX Improvement</Option>
              <Option value="Enhancement">Enhancement</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center', marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ minWidth: 200 }}
            >
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SubmitFeedbackPage;
