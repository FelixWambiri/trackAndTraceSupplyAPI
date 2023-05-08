#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Build the Docker image
docker build \
  --build-arg DATABASE_URL=$DATABASE_URL \
  --build-arg JWT_SECRET=$JWT_SECRET \
  -t track_and_trace .

docker run -p 3000:3000 track_and_trace