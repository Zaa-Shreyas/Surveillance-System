# Platform-Independent Surveillance System

This project is a platform-independent surveillance system. It allows users to manage devices, view live camera feeds, record clips, and monitor alerts.

## Directory Structure
- `frontend/`: React-based frontend for the surveillance system UI.
- `backend/`: Node.js/Express backend for the surveillance system (mocked data used for demo).

## Features
- **Device Management**: View and manage connected devices (e.g., Demo Camera at `http://192.168.1.7:8080/`).
- **Live Feed**: Display live camera feeds using snapshots or video streams.
- **Recordings**: Record and view mock video clips.
- **Alerts & Analytics**: Mocked alerts and analytics for demo purposes.
- **Animations**: Smooth UI transitions using `framer-motion`.

## Setup Instructions
1. **Frontend**:
   - Navigate to `frontend/`.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the frontend at `http://localhost:3000`.
2. **Backend** (if used):
   - Navigate to `backend/`.
   - Run `npm install` to install dependencies.
   - Run `node server.js` (or equivalent) to start the backend.

## Demo Notes
- The live feed requires a webcam app running on a phone at `http://192.168.1.7:8080/` (update the URL in `frontend/src/components/dashboard.jsx` if needed).
- Authentication is bypassed for the demo (`isAuthenticated` is hardcoded to `true` in `AppRoutes.js`).

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, React Router
- **Backend**: Node.js, Express (mocked for demo)
