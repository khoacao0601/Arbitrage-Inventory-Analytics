# Arbitrage & Inventory Analytics (Monorepo)

This project is structured as a Monorepo containing a decoupled Frontend (Angular SSR) and Backend (Node.js Express API).

## 📂 Project Structure

```text
arbitrage-inventory-analytics/
├── frontEnd/       # Angular SSR application (UI & Client-side logic)
├── backend/        # Node.js Express API (Business logic & Database access)
├── shared/         # Shared TypeScript interfaces and utilities (Future use)
├── GEMINI.md       # AI Long-term memory and project rules
├── docker-compose.yml # Orchestrates Docker containers for both services
└── package.json    # Root configuration for running concurrent scripts
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation
Since this is a monorepo, you need to install dependencies for the root, frontend, and backend.

1. **Install Root Dependencies:**
   ```bash
   npm install
   ```
2. **Install Frontend Dependencies:**
   ```bash
   cd frontEnd
   npm install
   cd ..
   ```
3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Environment Variables
For the Backend, you need a PostgreSQL database. Create a `.env` file in the `backend/` directory:
```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
```

### Running the Application Locally (Development)
To start both the Frontend and Backend simultaneously with a single command, run this at the **root** of the project:

```bash
npm run dev
```

- **Frontend** will be available at: `http://localhost:4000`
- **Backend API** will be available at: `http://localhost:3000`

## 🐳 Docker Deployment
To build and run the entire stack using Docker:
```bash
docker-compose up --build -d
```
