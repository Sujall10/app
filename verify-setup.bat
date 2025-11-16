@echo off
REM Installation Verification Script for Pearl Contact System
REM Run this to verify everything is set up correctly

echo.
echo ========================================
echo Pearl Contact System - Setup Verification
echo ========================================
echo.

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js NOT FOUND
    echo    Download from: https://nodejs.org/
    echo.
) else (
    echo ✅ Node.js installed
    node --version
)

REM Check npm
echo.
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm NOT FOUND
) else (
    echo ✅ npm installed
    npm --version
)

REM Check if node_modules exists
echo.
echo Checking dependencies...
if exist "node_modules" (
    echo ✅ Dependencies installed
) else (
    echo ❌ Dependencies NOT installed
    echo    Run: npm install
)

REM Check if .env file exists
echo.
echo Checking .env file...
if exist ".env" (
    echo ✅ .env file found
) else (
    echo ❌ .env file NOT found
    echo    Copy from .env.example and add credentials
)

REM Check key files
echo.
echo Checking key files...
if exist "server.js" echo ✅ server.js found
if exist "contact.html" echo ✅ contact.html found
if exist "admin.html" echo ✅ admin.html found
if exist "package.json" echo ✅ package.json found

REM Check if database exists
echo.
echo Checking database...
if exist "contacts.db" (
    echo ✅ Database exists (contacts.db)
) else (
    echo ℹ️  Database will be created when server starts
)

echo.
echo ========================================
echo Verification Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env with Gmail App Password
echo 2. Run: npm start
echo 3. Visit: http://localhost:3000/contact.html
echo.
pause
