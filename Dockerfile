# Use an official Node.js runtime as a parent image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# Copy the local codebase into the container
COPY . .

# Build the React app
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
