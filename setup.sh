#!/bin/bash

echo "🚀 Starting setup..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate db  
cd apps/robot-simulator-be
# Ensure .env exists
if [ ! -f .env ]; then
  touch .env
  echo "🆕 Created .env file"
fi

# Add DATABASE_URL to backend .env if not exists
if ! grep -q "DATABASE_URL" .env 2>/dev/null; then
  echo "DATABASE_URL=\"file:./dev.db\"" >> .env
  echo "✅ DATABASE_URL added to .env"
else
  echo "ℹ️ DATABASE_URL already exists in .env"
fi

# Setup Prisma
echo "🛠️ Running Prisma setup..."
npx prisma migrate dev
npx prisma generate

# Final instructions
echo ""
echo "✅ Setup complete!"
echo "👉 To start backend:  cd robot-simulator-be && pnpm run start:dev"
echo "👉 To start frontend: cd robot-simulator-fe && pnpm run dev"
echo "👉 Or start both from root: pnpm run dev"
echo "🌐 App will run at: http://localhost:5173"

# Return to root and run application
echo "Returning to root..."
cd ../..

info "Starting both apps with: pnpm run dev"
pnpm run dev

fi 
