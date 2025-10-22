# 🔧 Troubleshooting - VerdeMar

## Problemas Comuns e Soluções

### ❌ Backend não inicia

#### Problema: "Cannot find module '@prisma/client'"
**Causa**: Prisma Client não foi gerado após instalação

**Solução**:
```bash
cd back

# Opção 1: Com npx (se estiver habilitado)
npx prisma generate

# Opção 2: Direto com node (sempre funciona)
node node_modules\prisma\build\index.js generate
```

#### Problema: "npx não pode ser carregado" ou "execução de scripts desabilitada"
**Causa**: PowerShell com política de execução restritiva

**Soluções**:
1. Use CMD ao invés de PowerShell
2. Use `node` diretamente nos comandos
3. Use os arquivos `.bat` fornecidos (duplo clique)
4. Habilite scripts no PowerShell (como admin): `Set-ExecutionPolicy RemoteSigned`

#### Problema: "Port 4000 already in use"
**Causa**: Outro servidor rodando na porta 4000

**Soluções**:
1. Encerre processos anteriores: `taskkill /F /IM node.exe`
2. Ou mude a porta no arquivo `.env`: `PORT=4001`

---

### ❌ Locais Próximos

#### Problema: "Nenhum lugar próximo encontrado" na página de detalhes
**Causa**: Dados de locais próximos não foram populados ou Google Maps API Key não configurada

**Solução**:
1. Configure a chave da API do Google Maps (veja [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md))
2. Adicione no `back/.env`:
   ```
   GOOGLE_MAPS_API_KEY=sua_chave_aqui
   ```
3. Execute o script para buscar locais:
   ```bash
   cd back
   node src/scripts/fetchNearbyPlaces.js
   ```
4. Reinicie o backend

#### Problema: Imóvel aparece no mar no mapa
**Causa**: Coordenadas incorretas no banco de dados

**Solução**:
```bash
cd back
node fix-coordinates.js
```

---

### ❌ Banco de Dados

#### Problema: "Database connection failed"
**Causa**: Credenciais incorretas ou banco inacessível

**Solução**:
1. Verifique o arquivo `back/.env`
2. Confirme que a URL do MySQL está correta
3. Teste a conexão: `node back/test-db.js`

#### Problema: "Table does not exist"
**Causa**: Migrações não aplicadas

**Solução**:
```bash
cd back

# Verificar status
node node_modules\prisma\build\index.js migrate status

# Se o banco já existir (produção)
node node_modules\prisma\build\index.js db push

# Repopular dados (se necessário)
node quick-seed.js
```

---

### ❌ Frontend

#### Problema: "Failed to fetch" ou "Network Error"
**Causa**: Backend não está rodando ou CORS

**Solução**:
1. Verifique se backend está rodando em `http://localhost:4000`
2. Confirme `ALLOWED_ORIGIN=http://localhost:5173` no `back/.env`
3. Reinicie ambos servidores

#### Problema: "npm run dev" não funciona
**Causa**: Dependências não instaladas

**Solução**:
```bash
cd front
rm -rf node_modules package-lock.json  # Limpar
npm install                            # Reinstalar
npm run dev                            # Tentar novamente
```

---

## 📋 Checklist de Inicialização

### Backend (primeira vez)
- [ ] `cd back`
- [ ] `npm install`
- [ ] `node node_modules\prisma\build\index.js generate` (OBRIGATÓRIO)
- [ ] `node quick-seed.js` (popular dados)
- [ ] `node src\index.js` ou `start-backend.bat`
- [ ] Verificar: `http://localhost:4000/api/properties`

### Frontend (primeira vez)
- [ ] `cd front`
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Abrir: `http://localhost:5173`

---

## 🛠️ Comandos Úteis

### Backend
```bash
# Testar API
node back/test-api.js

# Testar conexão DB
node back/test-db.js

# Ver dados no banco (Prisma Studio)
node node_modules\prisma\build\index.js studio

# Limpar e repovoar banco
node back/delete-properties.js
node back/quick-seed.js
```

### Geral
```bash
# Ver processos Node rodando
tasklist | findstr node

# Encerrar todos processos Node
taskkill /F /IM node.exe

# Verificar portas em uso
netstat -ano | findstr :4000
netstat -ano | findstr :5173
```

---

## 🆘 Ainda com problemas?

1. **Limpe tudo e recomece**:
   ```bash
   cd back
   rm -rf node_modules package-lock.json
   npm install
   node node_modules\prisma\build\index.js generate
   
   cd ../front
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verifique versões**:
   ```bash
   node --version   # Deve ser v18 ou superior
   npm --version    # Deve ser v9 ou superior
   ```

3. **Use CMD em vez de PowerShell** se continuar com erros de execução

4. **Leia os logs** com atenção - a mensagem de erro geralmente indica o problema

---

## 📞 Suporte

- Veja `GUIA_COMPLETO.md` para documentação detalhada
- Veja `back/README.md` para detalhes da API
- Veja logs do terminal para erros específicos
