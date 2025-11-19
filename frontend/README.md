# Frontend - Secure Network Configuration Auditor

React-based web dashboard for the Network Configuration Auditor.

## Features

- File upload with drag-and-drop support
- Real-time analysis results
- Interactive issue filtering
- Security score visualization
- Responsive design

## Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Project Structure

```
frontend/src/
├── App.js                    # Main application component
├── index.js                  # React entry point
├── index.css                 # Global styles
├── components/
│   ├── ConfigInput.js        # File upload component
│   └── AnalysisResults.js    # Results display component
└── utils/
    └── api.js                # API communication
```

## Installation

```bash
npm install
```

## Running the Application

Development mode:
```bash
npm start
```

The application will open at `http://localhost:3000`

Build for production:
```bash
npm run build
```

## Components

### App.js
Main application component that:
- Manages application state
- Handles file analysis flow
- Checks backend server status
- Coordinates between components

### ConfigInput.js
File upload interface that:
- Supports drag-and-drop
- Validates file type and size
- Shows file information
- Triggers analysis

### AnalysisResults.js
Results display that shows:
- Security score with progress bar
- Issue counts by severity
- Configuration summary
- Detailed issue list with filtering
- Recommendations

## API Integration

The frontend communicates with the backend API at `http://localhost:5003`

To change the API URL, set environment variable:
```bash
REACT_APP_API_URL=http://your-backend-url
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Styling

Uses Tailwind CSS for styling. Configuration in `tailwind.config.js`

Custom colors:
- Primary: Blue (#2563eb)
- Secondary: Gray (#64748b)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features for Milestone 2

✅ File upload interface  
✅ Analysis results display  
✅ Security score visualization  
✅ Issue categorization  
✅ Severity-based filtering  
✅ Recommendations display  

## Planned Features (Milestone 3)

- Charts and graphs (Chart.js/Recharts)
- Configuration comparison
- PDF report export
- Advanced filtering
- Historical analysis

## Troubleshooting

**Port 3000 already in use:**
```bash
PORT=3000 npm start
```

**Backend connection error:**
- Make sure backend is running on port 5003
- Check CORS settings
- Verify API_URL in api.js

## Authors

- Kalash Kumari Thakur (230136)
- Manasa Chinnam (230078)

## License

Educational project - Academic use only