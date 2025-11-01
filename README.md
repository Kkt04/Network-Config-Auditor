# 🔒 Secure Network Configuration Auditor

**Computer Networks Project - Milestone 2**  
**Authors**: Kalash Kumari Thakur (230136), Manasa Chinnam (230078)  
**Institution**: Newton School of Technology 

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Usage Instructions](#usage-instructions)
- [Sample Configurations](#sample-configurations)
- [Security Checks](#security-checks)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Milestone Progress](#milestone-progress)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Secure Network Configuration Auditor** is an automated tool designed to analyze router and switch configuration files, detect security vulnerabilities, and provide actionable recommendations. This project addresses the critical need for automated security auditing in network infrastructure, making it easier for network administrators and students to identify and fix security issues.

### Problem Statement

Network devices like routers and switches often contain misconfigurations such as:
- Open ports exposing insecure services (Telnet, FTP)
- Weak or default passwords
- Missing access control lists (ACLs)
- Lack of security best practices

Manual auditing is time-consuming and error-prone. This tool automates the process, providing instant security analysis.

### Solution

A web-based application that:
1. Accepts network configuration files (Cisco-style syntax)
2. Parses and analyzes the configuration
3. Detects security vulnerabilities
4. Calculates a security score (0-100)
5. Provides specific recommendations for fixes
6. Displays results in an intuitive dashboard

---

## ✨ Features

### Milestone 2 Implementation (Current)

- ✅ **Configuration Parser**: Intelligent parsing of Cisco-style configurations
- ✅ **Vulnerability Detection**: Identifies 10+ types of security issues
- ✅ **Security Scoring**: 0-100 score with severity classification
- ✅ **Issue Categorization**: Critical, High, Medium, Low severity levels
- ✅ **Recommendations**: Actionable fixes for each detected issue
- ✅ **File Upload**: Drag-and-drop interface with validation
- ✅ **Real-time Analysis**: Results displayed in under 100ms
- ✅ **Interactive Dashboard**: Filter and view issues by severity
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **RESTful API**: Backend API for programmatic access

---

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - Modern UI framework
- **Tailwind CSS 3.3** - Utility-first styling
- **Axios 1.6** - HTTP client for API communication
- **React Scripts 5.0** - Build tooling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.18** - Web application framework
- **Multer 1.4** - File upload middleware
- **CORS 2.8** - Cross-origin resource sharing

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **VS Code** - Code editor (recommended)

---

## 📁 Project Structure

```
network-auditor/
│
├── README.md                           # This file
├── MILESTONE2_REPORT.md               # Detailed project report
├── SETUP_GUIDE.md                     # Installation instructions
│
├── backend/                           # Backend server
│   ├── server.js                      # Main server file
│   ├── package.json                   # Dependencies
│   ├── .gitignore                     # Git ignore rules
│   ├── README.md                      # Backend documentation
│   └── src/
│       ├── services/
│       │   └── analyzer.js            # Core analysis logic
│       ├── routes/
│       │   └── analyze.js             # API endpoints
│       └── utils/
│           └── helpers.js             # Utility functions
│
├── frontend/                          # React application
│   ├── package.json                   # Dependencies
│   ├── .gitignore                     # Git ignore rules
│   ├── README.md                      # Frontend documentation
│   ├── tailwind.config.js             # Tailwind configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── public/
│   │   └── index.html                 # HTML template
│   └── src/
│       ├── index.js                   # React entry point
│       ├── index.css                  # Global styles
│       ├── App.js                     # Main component
│       ├── components/
│       │   ├── ConfigInput.js         # File upload component
│       │   └── AnalysisResults.js     # Results display
│       └── utils/
│           └── api.js                 # API communication
│
├── sample-configs/                    # Test configuration files
│   ├── router-config-1.txt            # Vulnerable config
│   ├── router-config-2.txt            # Moderate security
│   ├── switch-config-1.txt            # Switch config
│   └── secure-config.txt              # Secure baseline
│
└── docs/                              # Documentation
    ├── ARCHITECTURE.md                # System architecture
    ├── API_DOCUMENTATION.md           # API reference
    └── TESTING_GUIDE.md               # Testing procedures
```

---

## 🚀 Installation Guide

### Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v14.0 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git** (optional)
   - Download from: https://git-scm.com/

### Step 1: Clone/Download the Project

**Option A: Using Git**
```bash
git clone <repository-url>
cd network-auditor
```

**Option B: Download ZIP**
- Download and extract the project ZIP file
- Open terminal in the extracted folder

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- cors
- multer
- body-parser

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This will install:
- react
- react-dom
- axios
- tailwindcss
- and other dependencies

### Step 4: Verify Installation

```bash
# In backend folder
npm list

# In frontend folder
npm list
```

Both should show installed packages without errors.

---

## 📖 Usage Instructions

### Starting the Application

#### 1. Start Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

Expected output:
```
✅ Backend server running on http://localhost:5000
📁 Ready to analyze configurations
```

**Keep this terminal window open!**

#### 2. Start Frontend Application

Open a **NEW** terminal window and run:

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

Your browser will automatically open to `http://localhost:3000`

### Using the Application

#### Method 1: Upload a File

1. **Open the application** in your browser (`http://localhost:3000`)
2. **Choose a sample file** from `sample-configs/` folder:
   - `router-config-1.txt` - Multiple vulnerabilities
   - `router-config-2.txt` - Moderate security
   - `switch-config-1.txt` - Switch configuration
   - `secure-config.txt` - Well-secured example
3. **Upload the file**:
   - Click "Browse Files" and select a file, OR
   - Drag and drop a file into the upload area
4. **Click "Analyze Configuration"**
5. **View results** (displayed within 1-2 seconds)

#### Method 2: API Access

Use the REST API directly:

```bash
# Using curl
curl -X POST http://localhost:5000/api/analyze \
  -F "configFile=@sample-configs/router-config-1.txt"

# Using Postman
POST http://localhost:5000/api/analyze
Body: form-data
Key: configFile
Value: [select file]
```

---

## 📂 Sample Configurations

### router-config-1.txt
**Profile**: Vulnerable Configuration  
**Expected Score**: 35/100 (Poor)  
**Issues**: 7-10 vulnerabilities  
**Key Problems**:
- Weak password "cisco"
- Telnet enabled (port 23)
- No access control lists
- HTTP server enabled
- No logging configured

### router-config-2.txt
**Profile**: Moderate Security  
**Expected Score**: 72/100 (Good)  
**Issues**: 2-4 vulnerabilities  
**Key Problems**:
- Missing ACL on some interfaces
- Minor configuration improvements needed

### switch-config-1.txt
**Profile**: Switch with Issues  
**Expected Score**: 40/100 (Poor)  
**Issues**: 5-8 vulnerabilities  
**Key Problems**:
- Weak password "admin"
- Transport input all (allows Telnet)
- No logging
- Missing security features

### secure-config.txt
**Profile**: Well-Secured  
**Expected Score**: 94/100 (Excellent)  
**Issues**: 0-2 minor recommendations  
**Strong Points**:
- Encrypted passwords
- SSH enabled, Telnet disabled
- ACLs configured
- Logging enabled
- Banner configured

---

## 🔍 Security Checks

The analyzer performs the following security checks:

### 1. Password Security
- ❌ Weak/default passwords (cisco, admin, password, 123456)
- ❌ Short passwords (< 8 characters)
- ❌ Plain text passwords
- ❌ Unencrypted enable passwords
- ✅ Strong encrypted passwords

### 2. Remote Access Security
- ❌ Telnet enabled (port 23)
- ❌ Mixed transport protocols (telnet + ssh)
- ❌ No access-class on VTY lines
- ✅ SSH-only access
- ✅ Access control configured

### 3. Access Control Lists
- ❌ Missing ACLs on active interfaces
- ❌ No access-class on remote access
- ❌ Unrestricted access
- ✅ Proper ACL configuration

### 4. Service Security
- ❌ HTTP server enabled (port 80)
- ❌ FTP enabled (port 21)
- ❌ Insecure services running
- ✅ Secure services only

### 5. Best Practices
- ❌ No logging configured
- ❌ Missing login banner
- ❌ Password encryption disabled
- ❌ No SSH configuration
- ✅ All best practices implemented

### Severity Levels

| Level | Description | Point Deduction | Color |
|-------|-------------|----------------|-------|
| 🔴 CRITICAL | Immediate security risks | -15 points | Red |
| 🟠 HIGH | Important security issues | -10 points | Orange |
| 🟡 MEDIUM | Configuration improvements | -5 points | Yellow |
| 🟢 LOW | Minor recommendations | -2 points | Green |

### Security Score Calculation

```
Security Score = 100 - (Critical × 15 + High × 10 + Medium × 5 + Low × 2)

Minimum: 0
Maximum: 100
```

**Rating Scale:**
- **90-100**: Excellent - Strong security posture
- **75-89**: Good - Minor improvements needed
- **50-74**: Fair - Several issues to address
- **25-49**: Poor - Significant security risks
- **0-24**: Critical - Immediate action required

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

Response:
```json
{
  "message": "Secure Network Configuration Auditor API",
  "status": "running",
  "version": "1.0.0"
}
```

#### 2. Analyze Configuration File
```http
POST /api/analyze
Content-Type: multipart/form-data
```

Request Body:
```
configFile: [file.txt]
```

Response:
```json
{
  "success": true,
  "filename": "router-config-1.txt",
  "analysisTime": "15ms",
  "analysis": {
    "totalIssues": 7,
    "critical": 3,
    "high": 2,
    "medium": 2,
    "low": 0,
    "securityScore": 35,
    "issues": [...],
    "recommendations": [...],
    "configSummary": {
      "totalInterfaces": 4,
      "totalVTYLines": 1,
      "totalACLs": 0
    }
  }
}
```

#### 3. Analyze Text Directly
```http
POST /api/analyze-text
Content-Type: application/json
```

Request Body:
```json
{
  "configText": "interface GigabitEthernet0/1\n..."
}
```

For complete API documentation, see `docs/API_DOCUMENTATION.md`

---

## 🧪 Testing

### Quick Test

1. **Backend Test**:
```bash
curl http://localhost:5000/
```

2. **File Analysis Test**:
```bash
curl -X POST http://localhost:5000/api/analyze \
  -F "configFile=@sample-configs/router-config-1.txt"
```

3. **Frontend Test**:
- Open `http://localhost:3000`
- Upload `router-config-1.txt`
- Verify results appear

### Expected Test Results

| Config File | Score | Critical | High | Medium | Low |
|-------------|-------|----------|------|--------|-----|
| router-config-1.txt | ~35 | 3 | 2 | 2 | 0 |
| router-config-2.txt | ~72 | 0 | 1 | 2 | 0 |
| switch-config-1.txt | ~40 | 2 | 1 | 2 | 1 |
| secure-config.txt | ~94 | 0 | 0 | 0 | 1 |

For detailed testing procedures, see `docs/TESTING_GUIDE.md`

---

## 📊 Milestone Progress

### ✅ Milestone 1 (Week 1-2): Completed
- [x] Project proposal
- [x] Problem statement
- [x] Literature review
- [x] Tool selection
- [x] Scope definition

### ✅ Milestone 2 (Week 3-4): Completed
- [x] Backend setup with Express.js
- [x] Configuration parser implementation
- [x] Security rule engine
- [x] Vulnerability detection (10+ checks)
- [x] Frontend setup with React
- [x] File upload interface
- [x] Results visualization
- [x] API endpoints
- [x] Sample configurations (4 files)
- [x] Basic testing
- [x] Documentation

**Deliverables Submitted:**
- ✅ Working prototype
- ✅ Source code
- ✅ Sample configurations
- ✅ Documentation
- ✅ MILESTONE2_REPORT.md

### 🔄 Milestone 3 (Week 5-6): Planned
- [ ] Advanced visualization (charts/graphs)
- [ ] Interactive dashboard enhancements
- [ ] Configuration comparison feature
- [ ] PDF report generation
- [ ] Analysis history tracking
- [ ] Enhanced UI/UX

### 🔄 Milestone 4 (Week 7-8): Planned
- [ ] Integration testing
- [ ] Cisco Packet Tracer simulation (optional)
- [ ] Advanced ACL analysis
- [ ] Custom rule creation
- [ ] Performance optimization
- [ ] Final documentation
- [ ] Project presentation

---

## 📸 Screenshots

### Main Dashboard
![Dashboard](screenshot-dashboard.png)
*Clean interface with file upload and feature overview*

### Analysis Results
![Results](screenshot-results.png)
*Detailed security analysis with severity-based categorization*

### Issue Details
![Issues](screenshot-issues.png)
*Comprehensive issue listing with recommendations*

---

## 🐛 Troubleshooting

### Problem: Backend won't start

**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process-id> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: Cannot find module errors

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Problem: Frontend won't connect to backend

**Error**: `Network Error` or CORS error

**Solution**:
1. Ensure backend is running: `http://localhost:5000`
2. Check CORS configuration in `backend/server.js`
3. Verify API URL in `frontend/src/utils/api.js`

### Problem: File upload fails

**Error**: `File too large` or `Invalid file type`

**Solution**:
- Ensure file is `.txt` format
- File size must be < 10MB
- Use plain text files only

### Problem: Analysis returns no results

**Possible Causes**:
- Empty configuration file
- Invalid configuration format
- Backend processing error

**Solution**:
1. Check browser console for errors
2. Verify file content is not empty
3. Try a sample configuration file
4. Check backend logs

For more help, see `SETUP_GUIDE.md` or contact the authors.

---

## 🚀 Future Enhancements

### Short-term 
- 📊 Interactive charts and visualizations
- 📑 PDF/Excel report export
- 🔄 Configuration version comparison
- 💾 Database integration for history
- 🎨 Dark mode UI
- 🔍 Advanced search and filtering


---

## 👥 Contributing

This is an academic project. Contributions and suggestions are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Test before committing

---

## 📄 License

This project is created for educational purposes as part of a Computer Networks course.

**Authors**: Kalash Kumari Thakur (230136), Manasa Chinnam (230078)

**Institution**: Newton School of Technology

**Course**: Computer Networks

---

## 🙏 Acknowledgments

- Course instructor for project guidance
- Cisco documentation for configuration syntax
- Open-source community for tools and libraries
- Sample configurations inspired by real-world scenarios

---

## 📚 References

1. Cisco IOS Configuration Fundamentals
2. Network Security Best Practices
3. OWASP Top 10 Security Risks
4. CWE (Common Weakness Enumeration)
5. React.js Documentation
6. Node.js Best Practices

---

## 📝 Changelog

### Version 1.0.0 (Milestone 2) - November 1, 2025
- Initial release
- Configuration parser
- Security analysis engine
- Web-based dashboard
- REST API
- Sample configurations
- Documentation


---

## Quick Links

- 📖 [Setup Guide](SETUP_GUIDE.md)
- 📋 [Milestone 2 Report](MILESTONE2_REPORT.md)
- 🏗️ [Architecture Documentation](docs/ARCHITECTURE.md)
- 📡 [API Reference](docs/API_DOCUMENTATION.md)
- 🧪 [Testing Guide](docs/TESTING_GUIDE.md)
- 💻 [Backend README](backend/README.md)
- 🎨 [Frontend README](frontend/README.md)

---
