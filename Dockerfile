FROM node:latest

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy lines.json file
COPY lines.json /app/lines.json

# Expose port (adjust if needed)
EXPOSE 3000

CMD ["npm", "start"]
