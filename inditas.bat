@echo off
chcp 65001 >nul
title NH Cargo weboldal - fejlesztoi szerver
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo A Node.js nincs telepitve. Toltse le: https://nodejs.org  ^(LTS valtozat^)
  pause
  exit /b 1
)

if not exist node_modules (
  echo Fuggosegek telepitese ^(csak elso alkalommal^)...
  call npm install
)

echo.
echo A weboldal elindul: http://localhost:4321
echo Leallitas: zarja be ezt az ablakot, vagy nyomja meg a Ctrl+C billentyuket.
echo.
start "" http://localhost:4321
call npm run dev
