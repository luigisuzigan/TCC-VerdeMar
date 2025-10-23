@echo off
cd /d "%~dp0"

REM Carregar variáveis de ambiente do .env
for /f "delims== tokens=1,2" %%G in (.env) do (
    set %%G=%%H
)

echo Iniciando Backend VerdeMar...
echo Diretorio: %CD%
node src\index.js
