FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies first (caching)
COPY package.json package-lock.json ./
RUN npm install

# Build the application
COPY . .
RUN npm run build

# -----------------
# Production stage
# -----------------
FROM nginx:alpine

# Copy the built files from the builder stage to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
