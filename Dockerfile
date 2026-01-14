# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

#Copy application code
COPY . .

# Expose application post
#ENV PORT=8080
ENV PORT=443

#EXPOSE 8080
EXPOSE 443

# Start the application
CMD ["node", "app.js"]