#!/bin/bash

# ISDR-GL Backend Installation Script

echo "🚀 ISDR-GL Backend Installation"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "📋 Next steps:"
echo "1. Copy .env.example to .env"
echo "2. Add your Supabase credentials to .env"
echo "3. Run the SQL schema from src/config/schema.sql in Supabase console"
echo "4. Start the server with: npm run dev"
echo ""
echo "📖 For detailed setup instructions, see SUPABASE_SETUP.md"
