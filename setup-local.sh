#!/bin/bash
# Quick Setup Script for Mac/Linux
# Run this script to setup the project locally

echo "🚀 Setting up Ministry Website locally..."
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client!"
    exit 1
fi
echo "✅ Prisma client generated"
echo ""

# Run migrations
echo "🗄️  Setting up database..."
npx prisma migrate deploy
if [ $? -ne 0 ]; then
    echo "❌ Failed to run migrations!"
    exit 1
fi
echo "✅ Database migrations completed"
echo ""

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database!"
    exit 1
fi
echo "✅ Database seeded"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    
    # Generate JWT_SECRET
    JWT_SECRET=$(openssl rand -base64 32)
    
    cat > .env << EOF
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="$JWT_SECRET"
EOF
    
    echo "✅ .env file created with generated JWT_SECRET"
else
    echo "ℹ️  .env file already exists, skipping..."
fi
echo ""

# Create uploads folder
echo "📁 Creating uploads folder..."
mkdir -p public/uploads/ministers
echo "✅ Uploads folder created"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Login to admin: http://localhost:3000/admin/login"
echo "   Email: admin@mow.gov"
echo "   Password: password123"
echo ""
echo "For detailed instructions, see LOCAL_TESTING_GUIDE.md"



