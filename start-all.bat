@echo off
echo Starting Zerodha Clone Application...

echo.
echo Starting Backend Server on port 3003...
start "Backend-3003" cmd /k "cd backend && set PORT=3003 && npm start"

timeout /t 5

echo.
echo Starting Dashboard on port 3004...
start "Dashboard-3004" cmd /k "cd dashboard && set PORT=3004 && npm start"

timeout /t 3

echo.
echo Starting Frontend on port 3005...
start "Frontend-3005" cmd /k "cd frontend && set PORT=3005 && npm start"

echo.
echo All services started!
echo Backend: http://localhost:3003
echo Dashboard: http://localhost:3004
echo Frontend: http://localhost:3005
pause