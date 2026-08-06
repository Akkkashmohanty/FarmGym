# 🌱 FarmGym

> Transforming Urban Farming Through Technology

FarmGym is a full-stack platform that combines **urban farming, learning, community engagement, AI-powered planning, and a marketplace** into a single application. It helps users grow food, learn modern farming techniques, buy and sell farming products, participate in the community, and monitor their farming journey.

---

# 🚀 Features

## 🌾 AI Farm Planner
- AI-powered crop planning
- Personalized farming recommendations
- Seasonal crop suggestions
- Farm activity tracking

---

## 🎓 Learning Platform
- Video learning platform
- Creator dashboard
- Progress tracking
- Farming tutorials

---

## 🛒 Marketplace
- Product catalog
- Seller dashboard
- Shopping cart
- Order management
- Inventory management

---

## ❤️ Donation Network
- Food donation
- Community support

---

## 👥 Community
- Community posts
- Challenges
- Activity feed
- Likes & comments

---

## 📊 Dashboard
- Analytics
- Notifications
- Achievements
- Farming statistics

---

## 🔐 Authentication

- JWT Authentication
- Role Based Access

Roles:

- User
- Farmer
- Seller
- Creator
- Admin

---

# 🏗 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Framer Motion

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL (Neon)
- JWT Authentication
- Boto3
- Google Gemini AI

---

## DevOps

- Docker
- Docker Compose
- GitHub
- GitHub Actions (Coming Soon)

---

# 📂 Project Structure

```
farmgym/
│
├── apps/
│   ├── api/
│   └── web/
│
├── docker/
├── infrastructure/
├── packages/
├── scripts/
│
├── docker-compose.yml
└── README.md
```

---

# 🐳 Running with Docker

## Requirements

- Docker Desktop
- Git

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/farmgym.git

cd farmgym
```

Create backend environment

```
apps/api/.env
```

Create frontend environment

```
apps/web/.env.local
```

Run

```bash
docker compose up --build
```

Application

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# 💻 Local Development

Backend

```bash
cd apps/api

python -m venv .venv

pip install -r requirements.txt

python -m alembic upgrade head

python -m uvicorn app.main:app --reload
```

Frontend

```bash
cd apps/web

npm install

npm run dev
```

---

# 🔧 Environment Variables

Backend

```
DATABASE_URL

JWT_SECRET_KEY

JWT_ALGORITHM

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

AWS_BUCKET_NAME

OPENWEATHER_API_KEY

GEMINI_API_KEY
```

Frontend

```
NEXT_PUBLIC_API_URL

NEXT_PUBLIC_APP_NAME
```

---

# 📸 Screenshots

Coming Soon

---

# 🛣 Roadmap

- AI Recommendation Engine
- Payment Integration
- Mobile Application
- Notifications
- Chat System
- Multi-language Support
- Kubernetes Deployment

---

# 🤝 Contributing

1. Fork the repository

2. Create a feature branch

3. Commit your changes

4. Push your branch

5. Open a Pull Request

---

# 📄 License

MIT License