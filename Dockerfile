# Step 1: Use the official Node.js image as the base image
FROM node:lts-slim

# Set the working directory
WORKDIR /usr/src/app

# Step 2: Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 3: Copy your application files
COPY . .

# Compile TypeScript
RUN npm run build

# Step 4: Set the environment variables
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

# Step 5: Run Prisma migrations
RUN npx prisma migrate deploy

# Step 6: Run Prisma migrations
RUN npx prisma generate

# Step 7: Expose port 3000
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]