# Nova AI – Backend (Node.js & Express)

This is the **backend service** for the Nova AI application. It handles authentication, AI processing, vector search, real-time communication, and data persistence. The backend integrates **Google Gemini**, **Pinecone**, **Redis**, and **WebSockets** to support a scalable AI chat system.

**Backend Repo:** https://github.com/mishra-anik/Nova-Ai-Backend.git

---

## Features
- User authentication (register, login, logout)
- JWT-based auth control
- AI response generation service
- Vector search using Pinecone
- Socket.io server for real-time chat
- Modular MVC-based architecture
- Environment-based configuration

---

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Cache:** Redis
- **Vector DB:** Pinecone
- **AI:** Google Gemini API
- **Realtime:** Socket.IO / WebSocket
- **Auth:** JWT

---

## Folder Structure

server/
├── src/
│ ├── controllers/
│ │ └── auth.controller.js
│ ├── db/
│ │ └── db.js
│ ├── models/
│ │ ├── user.model.js
│ │ ├── chat.model.js
│ │ └── message.model.js
│ ├── routes/
│ │ └── auth.route.js
│ ├── service/
│ │ ├── ai.service.js
│ │ └── vector.service.js
│ ├── socket/
│ │ └── socket.server.js
│ └── app.js
│
├── server.js
├── .env
├── package.json
└── package-lock.json


---

## Environment Variables
Create a `.env` file in the root directory:

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_index_name

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

Run Locally
git clone https://github.com/mishra-anik/Nova-Ai-Backend.git
cd Nova-Ai-Backend
npm install
npm run dev


Server runs on:

http://localhost:8080

API Responsibilities

/auth – user authentication routes

AI service – prompt handling & response generation

Vector service – semantic search using embeddings

Socket server – real-time message handling

License

MIT License
Author: Anik Mishra
