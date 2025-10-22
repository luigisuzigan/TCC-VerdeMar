@echo off
echo ============================================
echo  VerdeMar - Setup Completo dos Locais Proximos
echo ============================================
echo.

cd /d "%~dp0"

echo [1/3] Verificando e corrigindo coordenadas...
node fix-coordinates.js
if errorlevel 1 (
    echo ERRO ao corrigir coordenadas!
    pause
    exit /b 1
)

echo.
echo [2/3] Verificando chave do Google Maps...
findstr /C:"GOOGLE_MAPS_API_KEY=" .env | findstr /V /C:"GOOGLE_MAPS_API_KEY=$" | findstr /V /C:"GOOGLE_MAPS_API_KEY= " >nul
if errorlevel 1 (
    echo.
    echo ============================================
    echo  ATENCAO: Google Maps API Key nao configurada!
    echo ============================================
    echo.
    echo Para buscar locais proximos, voce precisa:
    echo 1. Obter uma chave em: https://console.cloud.google.com/
    echo 2. Adicionar no arquivo .env: GOOGLE_MAPS_API_KEY=sua_chave
    echo 3. Ler o guia: GOOGLE_MAPS_SETUP.md
    echo.
    echo Pulando busca de locais proximos...
    echo.
    pause
    exit /b 0
)

echo.
echo [3/3] Buscando locais proximos (isso pode levar alguns minutos)...
node src/scripts/fetchNearbyPlaces.js
if errorlevel 1 (
    echo ERRO ao buscar locais proximos!
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Setup Concluido!
echo ============================================
echo.
echo Verifique os dados com: node check-property-data.js
echo.
pause
