#!/bin/bash

# Load environment variables from .env if present
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

echo "Building for production..."
npm run build

echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting
