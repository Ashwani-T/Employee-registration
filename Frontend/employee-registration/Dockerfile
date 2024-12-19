# Use official Node.js image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
