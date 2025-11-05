@echo off
echo Aplicando migração para corrigir tamanho do campo images...
npx prisma migrate dev --name fix_images_field_size
echo.
echo Migração concluída!
pause
