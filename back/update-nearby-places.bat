@echo off
echo ========================================
echo  Atualizando Locais Proximos
echo ========================================
echo.
echo Este script busca locais proximos para todos os imoveis
echo usando a API do Google Maps (escolas, supermercados, etc.)
echo.
echo Pressione Ctrl+C para cancelar...
timeout /t 3
echo.
node src/scripts/fetchNearbyPlaces.js
echo.
echo ========================================
echo  Concluido!
echo ========================================
pause
