# ==========================================
# STAGE 1: BUILD APP (name builder)
# ==========================================
# 1. Use Linux with Node.js V.20
FROM node:20-alpine AS builder

# 2. Create a folder /app inside Linux and move into it
WORKDIR /app

# 3. Copy 2 file package.json and package-lock.json from my PC into /app
COPY package*.json ./

# 4. Run the install (it will create node_modules in Linux)
RUN npm install

# 5. Copy all my source code (except what is in .dockerignore)
COPY . .

# 6. Run build Angular into runable file (HTML, JS, CSS)
RUN npm run build

# ==========================================
# STAGE 2: ENV (Runner)
# ==========================================
# 7. Start with new OS Linux (don't include source code and node_modules above)
FROM node:20-alpine AS runner

WORKDIR /app

# 8. Only pick "dist" (chứa file đã build) from Stage 1 to Stage 2
COPY --from=builder /app/dist ./dist

# 9. Let Docker this app will run on port 4000
EXPOSE 4000

# 10. Start server (like the command we have it package.json)
CMD ["node", "dist/pratice-angular/server/server.mjs"]