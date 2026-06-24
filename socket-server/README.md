# Socket.io Server for Nexus ViewportVerse

This is a standalone Socket.io server that handles real-time chat functionality for the Nexus ViewportVerse portfolio. It's deployed separately from the frontend to enable real-time communication on static hosting platforms like Netlify.

## Features

- Real-time bidirectional chat between visitors and admin
- In-memory conversation persistence (stored in `chat-data.json`)
- CORS-enabled for cross-origin requests
- Admin dashboard integration

## Deployment Options

### Option 1: Railway (Recommended)

1. Create a new Railway account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Connect this repository (or create a separate repo for just the `socket-server` folder)
4. Railway will automatically detect the Node.js project
5. Set the `PORT` environment variable (Railway does this automatically)
6. Deploy and copy the generated URL (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. Create a Render account at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node 18+
5. Deploy and copy the generated URL

### Option 3: Heroku

1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Push: `git push heroku main`
5. Copy the generated URL

### Option 4: VPS (DigitalOcean, Linode, etc.)

1. SSH into your server
2. Clone the repository
3. Navigate to `socket-server` folder
4. Run: `npm install`
5. Run: `npm start` (or use PM2 for production: `pm2 start index.ts --name socket-server`)
6. Use your server's IP or domain

## Local Development

1. Navigate to the `socket-server` directory:
   ```bash
   cd socket-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

4. The server will run on `http://localhost:3000` (or the PORT specified in environment variable)

## Environment Variables

- `PORT` - Server port (default: 3000, automatically set by most platforms)

## Connecting Frontend

After deploying the Socket.io server:

1. Copy the deployed server URL (e.g., `https://your-app.railway.app`)
2. In your main project's `.env` file, set:
   ```
   VITE_SOCKET_SERVER_URL=https://your-app.railway.app
   ```
3. Rebuild and redeploy your frontend

## Data Persistence

Conversations are stored in `chat-data.json` in the server's working directory. Note that on serverless platforms like Railway/Render, this file will be reset on each deployment. For production, consider:

- Using a database (PostgreSQL, MongoDB, Redis)
- Using cloud storage (AWS S3, Cloud Storage)
- Using a managed Redis service for persistence

## API Events

### Client → Server

- `visitor:join` - `{ visitorId, visitorName }` - Visitor joins chat
- `visitor:message` - `{ visitorId, text }` - Visitor sends message
- `admin:join` - Admin joins dashboard
- `admin:message` - `{ visitorId, text }` - Admin sends message

### Server → Client

- `conversation:history` - `{ messages, ... }` - Conversation history
- `message:new` - `{ id, sender, text, timestamp }` - New message
- `conversations:all` - `Conversation[]` - All conversations for admin
- `conversation:update` - `Conversation` - Updated conversation

## Troubleshooting

**Connection refused**: Ensure the server is running and the URL is correct
**CORS errors**: The server allows all origins (`*`) for development
**Messages not persisting**: Check file permissions for `chat-data.json`
**Deployment fails**: Ensure Node.js version is 18+ in platform settings
