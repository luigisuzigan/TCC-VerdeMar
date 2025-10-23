@echo off
cd /d "%~dp0"

set DATABASE_URL=mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar
set SHADOW_DATABASE_URL=mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar_shadow
set JWT_SECRET=66f442f4025c8cb8376780c34b3b870fa257b9a908d671e468afe27db30eefc93d88c63123c4952a51e87f252bb3b28db1ec6dcd40ce1312208194cc42eca0c2
set ADMIN_EMAIL=admin@verdemarsc.com
set ADMIN_PASSWORD=admin123
set PORT=4000
set ALLOWED_ORIGIN=http://localhost:5173
set GOOGLE_MAPS_API_KEY=AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM

echo Iniciando Backend VerdeMar...
echo Diretorio: %CD%
node src\index.js
