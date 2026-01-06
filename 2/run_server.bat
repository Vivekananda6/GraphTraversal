@echo off
REM Graph Traversal Visualization Server Launcher
REM Double-click this file to start the server

echo.
echo ========================================================
echo   Graph Traversal Visualization - Server Launcher
echo ========================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org
    pause
    exit /b 1
)

echo Starting Graph Traversal Visualization Server...
echo.
echo Opening http://localhost:8000 in your browser...
echo.

REM Run the Python server
python "%~dp0server.py"

pause
