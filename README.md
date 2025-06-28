# 💡 FeedbackHub

A modern, user-friendly feedback management system built with React.js and Ant Design. FeedbackHub allows users to submit, browse, and manage feedback efficiently with a clean and intuitive interface.

## ✨ Features


### 🔧 **Technical Features**
- **Real-time Updates**: Instant feedback on user actions
- **Search & Filter**: Advanced filtering by status, category, and date
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: Graceful error handling with user-friendly messages
- **API Integration**: RESTful API communication with Axios

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on port 5000

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feedbackhub.git
   cd feedbackhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
feedbackhub/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.js        # Navigation header
│   │   ├── FeedbackCard.js  # Individual feedback display
│   │   └── StatsCards.js    # Statistics dashboard cards
│   ├── pages/               # Main application pages
│   │   ├── HomePage.js      # Home page with feedback list
│   │   ├── SubmitFeedbackPage.js  # Feedback submission form
│   │   ├── FeedbackDetailPage.js  # Detailed feedback view
│   │   └── AdminDashboard.js      # Admin management panel
│   ├── services/            # API communication
│   │   └── api.js          # Axios configuration and endpoints
│   ├── utils/              # Helper functions
│   │   └── helpers.js      # Utility functions for colors, text, etc.
│   ├── App.js              # Main app component with routing
│   ├── index.js            # React app entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **UI Library**: Ant Design 5.12.8
- **Routing**: React Router DOM 6.8.1
- **HTTP Client**: Axios 1.6.2
- **Build Tool**: Create React App
- **Styling**: CSS + Ant Design themes

## 📊 API Endpoints

The application expects the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feedbacks` | Get all feedback with optional filters |
| GET | `/feedbacks/:id` | Get specific feedback details |
| POST | `/feedbacks` | Create new feedback |
| PATCH | `/feedbacks/:id/upvote` | Upvote a feedback |
| PATCH | `/feedbacks/:id/status` | Update feedback status |
| POST | `/feedbacks/:id/comments` | Add comment to feedback |
| GET | `/stats` | Get application statistics |

## 🎨 Key Components

### FeedbackCard
Displays individual feedback items with:
- Status and category tags
- Title and description preview
- Upvote button and count
- View details link

### StatsCards
Shows application metrics:
- Total feedback count
- Status distribution
- Visual icons and colors


## 📱 Responsive Design

FeedbackHub is fully responsive with breakpoints:
- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)

## 🎯 Usage Examples

### Submitting Feedback
1. Navigate to the "Submit" page
2. Fill in the required fields:
   - Title (minimum 5 characters)
   - Description (minimum 20 characters)
   - Category (Feature, Bug, UI, Enhancement)
3. Click "Submit Feedback"

### Admin Management
1. Access the Admin Dashboard
2. View feedback statistics
3. Update feedback status using dropdown menus
4. Click on feedback titles to view details

### Filtering Feedback
Use the filter controls on the home page:
- **Status**: Open, Planned, In Progress, Done
- **Category**: Feature, Bug, UI, Enhancement
- **Sort**: Newest, Oldest, Most Upvoted

## 🔍 Development

### Available Scripts
```bash
npm start          # Run development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App (irreversible)
```

### Code Structure Guidelines
- **Components**: Reusable UI elements
- **Pages**: Route-level components
- **Services**: API communication logic
- **Utils**: Helper functions and utilities

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Common Platforms
- **Netlify**: Connect GitHub repo and deploy automatically
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use `gh-pages` package for deployment



## 🙏 Acknowledgments

- **Ant Design** for the excellent UI component library
- **React Team** for the amazing framework
- **Create React App** for the development setup
- **Axios** for HTTP client functionality

