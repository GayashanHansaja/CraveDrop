# Step 1: Build the app with Vite using Yarn
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

# Copy the rest of the project
COPY ./src .

# Build the app
RUN yarn build

# Step 2: Serve the app with Nginx
FROM nginx:alpine AS production

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Custom Nginx config for SPA routing
COPY Nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
