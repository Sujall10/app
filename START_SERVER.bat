@echo off
REM Start Script for Pearl Contact System
REM Double-click this file to start the server

echo.
echo ========================================
echo Pearl Contact System - Starting Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Failed to install dependencies
        echo Please run: npm install
        pause
        exit /b 1
    )
)

REM Check if .env file exists
if not exist ".env" (
    echo.
    echo ⚠️  WARNING: .env file not found!
    echo Please create .env with your Gmail credentials
    echo See .env.example for template
    echo.
    pause
)

echo.
echo 🚀 Starting server...
echo.
echo Access your site at:
echo   - Website: http://localhost:3000
echo   - Contact Form: http://localhost:3000/contact.html
echo   - Admin Panel: http://localhost:3000/admin.html
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

pause
