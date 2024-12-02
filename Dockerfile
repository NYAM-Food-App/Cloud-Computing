# Use the official Node.js 20 image as base
FROM node:20.14.0

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the application port (default: 8080 for Cloud Run)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
