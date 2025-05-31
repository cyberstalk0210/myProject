# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY app-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY app-frontend/ ./

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]