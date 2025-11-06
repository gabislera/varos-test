#!/bin/sh
# Exit on error
set -e

# Check if DATABASE_URL exists
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set, skipping Prisma generation"
  exit 0
fi

# Generate Prisma Client
npx prisma generate
