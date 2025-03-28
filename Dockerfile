# Dockerfile for Next.js application

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies using pnpm (adjust if using npm/yarn)
RUN npm install -g pnpm && pnpm install

# Copy all files
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies
RUN npm install -g pnpm && pnpm install --prod

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]

# How to use this Dockerfile:
# 1. Build the image: docker build -t person-management .
# 2. Run the container: docker run -p 3000:3000 person-management
# 3. Access the app at http://localhost:3000

# Optional optimizations:
# - Add .dockerignore file to exclude node_modules, .next, etc
# - For production, consider using Nginx as a reverse proxy
# - For development, mount volumes for hot reloading