# Quick Setup Script for Windows PowerShell
# Run this script to setup the project locally

Write-Host "🚀 Setting up Ministry Website locally..." -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green
Write-Host ""

# Run migrations
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to run migrations!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database migrations completed" -ForegroundColor Green
Write-Host ""

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
npx prisma db seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database seeded" -ForegroundColor Green
Write-Host ""

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    
    # Generate JWT_SECRET
    $jwtSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
    
    $envContent = @"
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="$jwtSecret"
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ .env file created with generated JWT_SECRET" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .env file already exists, skipping..." -ForegroundColor Cyan
}
Write-Host ""

# Create uploads folder
Write-Host "📁 Creating uploads folder..." -ForegroundColor Yellow
New-Item -Path "public\uploads\ministers" -ItemType Directory -Force | Out-Null
Write-Host "✅ Uploads folder created" -ForegroundColor Green
Write-Host ""

Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start the development server: npm run dev" -ForegroundColor White
Write-Host "2. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "3. Login to admin: http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "   Email: admin@mow.gov" -ForegroundColor White
Write-Host "   Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see LOCAL_TESTING_GUIDE.md" -ForegroundColor Cyan



