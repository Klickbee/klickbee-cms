FROM node:22-alpine
WORKDIR /app

# Copy package files and Prisma schema
COPY package*.json tsconfig*.json ./
COPY prisma ./prisma/

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Set the command to use setup:dev script
CMD ["npm", "run", "setup:dev"]
