# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

#Copy application code
COPY . .

# Expose application post
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]