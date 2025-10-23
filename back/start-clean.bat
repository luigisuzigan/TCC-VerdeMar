@echo off
echo Limpando conexoes antigas do banco...
node clear-connections.js
timeout /t 2
echo.
echo Iniciando backend...
node src\index.js
