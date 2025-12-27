# GearGuard: The Ultimate Maintenance Tracker

![GearGuard Logo](https://img.shields.io/badge/GearGuard-Maintenance%20Tracker-blue?style=for-the-badge&logo=gear&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-green?style=flat-square&logo=django)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

> **Revolutionizing Equipment Maintenance Management**  
> A comprehensive, user-centric platform that transforms how organizations track, manage, and optimize their equipment maintenance lifecycle.

## 🌟 What Makes GearGuard Exceptional

GearGuard isn't just another maintenance tracking system—it's a **game-changer** designed to eliminate downtime, reduce costs, and maximize operational efficiency. Built for modern industries, it combines intuitive design with powerful analytics to keep your equipment running at peak performance.

### 🚀 Key Highlights
- **Proactive Maintenance**: Shift from reactive to preventive maintenance with intelligent scheduling
- **Real-time Visibility**: Kanban boards and calendar views for instant status updates
- **Team Collaboration**: Seamless coordination between technicians, managers, and stakeholders
- **Scalable Architecture**: Built with Django REST Framework and React for enterprise-grade performance
- **Mobile-First Design**: Responsive interface that works flawlessly across all devices

## 🎯 Problem Statement & Solution

**The Challenge**: Traditional maintenance systems are cumbersome, paper-based, and lack real-time insights, leading to:
- Unplanned downtime costing millions annually
- Inefficient resource allocation
- Poor communication between teams
- Lack of predictive maintenance capabilities

**Our Solution**: GearGuard provides a centralized, digital platform that:
- Tracks equipment lifecycle from purchase to disposal
- Automates maintenance scheduling and notifications
- Provides actionable insights through comprehensive dashboards
- Ensures accountability with role-based access control

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Django REST API│    │   SQLite DB     │
│   (Vite + Tailwind)  │◄──►│  (DRF Backend) │◄──►│  (Production:  │
│                     │    │                 │    │   PostgreSQL) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   User Interface        Business Logic         Data Persistence
```

## 🛠️ Tech Stack

### Backend
- **Django 6.0** - High-level Python web framework
- **Django REST Framework** - Powerful API toolkit
- **SQLite** - Lightweight database (development)
- **PostgreSQL** - Production-ready database

### Frontend
- **React 18** - Modern JavaScript library for UI
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Axios** - HTTP client for API calls
- **React Big Calendar** - Calendar component for scheduling
- **@hello-pangea/dnd** - Drag and drop functionality

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📋 Features

### 🔧 Equipment Management
- Comprehensive equipment cataloging
- Serial number tracking and warranty management
- Department and location assignment
- Maintenance team association
- Soft delete functionality for data integrity

### 📝 Maintenance Requests
- **Corrective Maintenance**: Reactive repairs for breakdowns
- **Preventive Maintenance**: Scheduled upkeep to prevent failures
- Status tracking: New → In Progress → Repaired/Scrap
- Priority assignment and technician allocation

### 👥 Team Management
- Dynamic maintenance team creation
- Member assignment and role management
- Cross-functional collaboration tools

### 📊 Dashboard & Analytics
- Real-time equipment status overview
- Maintenance request metrics
- Overdue task alerts
- Performance insights and reporting

### 📅 Calendar Integration
- Visual maintenance scheduling
- Deadline tracking and reminders
- Resource availability planning

### 📋 Kanban Board
- Drag-and-drop task management
- Workflow visualization
- Progress tracking at a glance

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.8+** - Backend runtime
- **Node.js 16+** - Frontend runtime
- **Git** - Version control
- **Virtual Environment** (recommended for Python)

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/gearguard-maintenance-tracker.git
   cd gearguard-maintenance-tracker/backend
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create Superuser** (Optional)
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Development Server**
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### 🔗 API Integration

The frontend automatically connects to the backend API. For production deployment:

1. Update `frontend/src/services/api.js` with production API URL
2. Configure CORS in Django settings for production domain
3. Set up environment variables for sensitive data

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/login/` - User authentication
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration

### Equipment Endpoints
- `GET /api/equipment/` - List all equipment
- `POST /api/equipment/` - Create new equipment
- `GET /api/equipment/{id}/` - Get equipment details
- `PUT /api/equipment/{id}/` - Update equipment
- `DELETE /api/equipment/{id}/` - Delete equipment

### Maintenance Endpoints
- `GET /api/maintenance/requests/` - List maintenance requests
- `POST /api/maintenance/requests/` - Create maintenance request
- `GET /api/maintenance/requests/{id}/` - Get request details
- `PUT /api/maintenance/requests/{id}/` - Update request status

### Team Endpoints
- `GET /api/teams/` - List maintenance teams
- `POST /api/teams/` - Create new team
- `GET /api/teams/{id}/` - Get team details
- `PUT /api/teams/{id}/` - Update team information

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm run lint
```

## 🚀 Deployment

### Backend Deployment (Django)
1. Set `DEBUG = False` in settings.py
2. Configure `ALLOWED_HOSTS` for production domain
3. Use PostgreSQL for production database
4. Set up static file serving (nginx/apache)
5. Configure environment variables for secrets

### Frontend Deployment (Vite)
1. Build production assets:
   ```bash
   npm run build
   ```
2. Serve `dist/` folder with nginx/apache
3. Configure API base URL for production

### Docker Deployment (Recommended)
```dockerfile
# Multi-stage build for optimized production images
FROM python:3.11-slim as backend
# Backend build steps...

FROM node:18-alpine as frontend
# Frontend build steps...

FROM nginx:alpine
# Serve both backend and frontend
```

## 🤝 Contributing

We welcome contributions! Here's how you can help make GearGuard even better:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript/React
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure responsive design for all components

## 📈 Roadmap

### Phase 1 (Current) ✅
- Core equipment and maintenance tracking
- Basic dashboard and reporting
- Team management system

### Phase 2 (Upcoming)
- [ ] **IoT Integration**: Connect with sensors for predictive maintenance
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Advanced Analytics**: ML-powered failure prediction
- [ ] **Notification System**: Email/SMS alerts for critical maintenance

### Phase 3 (Future Vision)
- [ ] **Multi-tenant Architecture**: SaaS platform for multiple organizations
- [ ] **Blockchain Integration**: Immutable maintenance records
- [ ] **AR/VR Support**: Augmented reality for equipment inspection
- [ ] **AI Assistant**: Chatbot for maintenance guidance

## 🏆 Awards & Recognition

*Built with ❤️ for the Odoo-Adani 2025*



**GearGuard** - Keeping your world running smoothly, one gear at a time. ⚙️

*Made with passion by Team*
