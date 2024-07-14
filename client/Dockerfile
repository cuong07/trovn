# Use the official Node.js 20.9 image
FROM node:20.9

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Command to serve the static files
CMD ["serve", "-s", "dist"]
