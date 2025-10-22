@echo off
cd /d "%~dp0"
npx prisma db push
echo.
echo Pressione qualquer tecla para continuar...
pause > nul
