import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://backend-code-de7t.onrender.com',
  headers: { 'Content-Type': 'application/json' }
});

export const feedbackApi = {
  getFeedbacks: (params) => api.get('/feedbacks', { params }),
  getFeedback: (id) => api.get(`/feedbacks/${id}`),
  createFeedback: (data) => api.post('/feedbacks', data),
  upvoteFeedback: (id) => api.patch(`/feedbacks/${id}/upvote`),
  updateStatus: (id, status) => api.patch(`/feedbacks/${id}/status`, { status }),
  addComment: (id, data) => api.post(`/feedbacks/${id}/comments`, data),
  getStats: () => api.get('/stats')
};

export default api