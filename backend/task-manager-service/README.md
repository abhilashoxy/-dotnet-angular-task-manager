# 📝 .NET + Angular Task Manager App

A full-stack task management system built with ASP.NET Core Web API, Angular, and SQL Server. It includes authentication with JWT, user-based task operations, and responsive UI.

## 🚀 Tech Stack

- Backend: ASP.NET Core 6 Web API
- Frontend: Angular 16
- Database: SQL Server
- Auth: JWT Token
- Hosting (optional): Azure / Render / Netlify

## 📦 Features

- User Registration & Login
- JWT-based Authentication
- Create / Read / Update / Delete Tasks
- Angular UI with Bootstrap
- Auth Guard & HTTP Interceptor
- Role-based access (optional)

## 📁 Project Structure

├── backend/
│ └── Controllers, Models, DTOs, Services, DbContext
├── frontend/
│ └── Angular components, services, guards, interceptors

## 🛠️ Getting Started

### Prerequisites:
- .NET 6 SDK
- Node.js + Angular CLI
- SQL Server (Local or Docker)
- Git

### Backend Setup:
```bash
cd backend/task-manager-service
dotnet restore
dotnet ef database update
dotnet run

Frontend Setup:
cd frontend/task-manager-ui
npm install
ng serve

API Authentication

Register user → /api/auth/register

Login user → /api/auth/login

Token is passed via Bearer Header to secure endpoints

Deployment Options

Azure App Services (Backend)

Azure Static Web App / Netlify (Frontend)

Azure SQL / Docker for DB

 Screenshots

Author
Abhilash

