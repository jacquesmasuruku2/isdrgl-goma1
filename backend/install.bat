@echo off
REM ISDR-GL Backend Installation Script for Windows

echo.
echo 🚀 ISDR-GL Backend Installation
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✓ Node.js version:
node --version

echo ✓ npm version:
npm --version

echo.
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Dependencies installed successfully
) else (
    echo.
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 📋 Next steps:
echo 1. Copy .env.example to .env
echo 2. Add your Supabase credentials to .env
echo 3. Run the SQL schema from src/config/schema.sql in Supabase console
echo 4. Start the server with: npm run dev
echo.
echo 📖 For detailed setup instructions, see SUPABASE_SETUP.md
echo.
pause
