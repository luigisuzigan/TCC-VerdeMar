# 🛠️ Scripts Utilitários - Backend

Scripts de manutenção, testes e configuração do backend.

## 📋 Categorias

### 🧪 Scripts de Teste
- **test-api.js** - Testar endpoints da API
- **test-api-images.js** - Testar retorno de imagens pela API
- **test-api-nearby.js** - Testar API de lugares próximos
- **test-properties.js** - Testar consultas de propriedades
- **test-db.js** - Testar conexão com banco de dados
- **test-images-db.js** - Testar imagens no banco
- **test-dashboard.js** - Testar dados do dashboard
- **test-update.js** - Testar atualizações

### 🔍 Scripts de Verificação
- **check-coords.js** - Verificar coordenadas dos imóveis
- **check-property-data.js** - Verificar dados de propriedades
- **check-properties-temp.js** - Verificação temporária
- **check-images-format.js** - Verificar formato de imagens
- **verify-persistence.js** - Verificar persistência de dados

### 🔧 Scripts de Atualização
- **update-test-images.js** - Atualizar todas imagens de teste (10 fotos)
- **update-images.js** - Atualizar imagens de imóveis
- **update-properties-images.js** - Atualizar relação imóvel-imagens
- **update-db-schema.bat** - Atualizar schema do banco

### 📸 Scripts de Imagens
- **add-8-photos.js** - Adicionar 8 fotos aos imóveis

### 🔧 Scripts de Correção
- **fix-coordinates.js** - Corrigir coordenadas de imóveis
- **fix-images-migration.bat** - Corrigir migração de imagens

### 🗑️ Scripts de Limpeza
- **delete-properties.js** - Deletar propriedades do banco
- **clear-connections.js** - Limpar conexões do banco

### ⚙️ Scripts de Configuração
- **add-amenities.bat** - Adicionar comodidades
- **setup-nearby-places.bat** - Configurar lugares próximos

### 🚀 Scripts de Inicialização
- **restart-backend.bat** - Reiniciar o backend
- **start-clean.bat** - Iniciar com banco limpo
- **start-with-env.bat** - Iniciar com variáveis de ambiente

### 📊 Scripts de Testes Especiais
- **test-dashboard.bat** - Testar dashboard (batch)

## 🎯 Scripts Mais Usados

### Atualizar imagens de teste
```bash
node scripts/update-test-images.js
```
Atualiza todos os imóveis com as mesmas 10 fotos de teste.

### Testar API
```bash
node scripts/test-api.js
```
Testa os principais endpoints da API.

### Verificar coordenadas
```bash
node scripts/check-coords.js
```
Verifica quais imóveis têm coordenadas válidas.

### Verificar propriedades
```bash
node scripts/test-properties.js
```
Lista e verifica os imóveis no banco.

## 📝 Como Usar

### Executar de qualquer lugar
```bash
# Da raiz do backend
node scripts/nome-do-script.js

# Ou entre na pasta
cd scripts
node nome-do-script.js
```

### Scripts .bat
```bash
# Windows - duplo clique ou via terminal
scripts\nome-do-script.bat
```

## ⚠️ Cuidados

- **delete-properties.js**: ⚠️ DELETA todos os imóveis! Use com cuidado
- **clear-connections.js**: Limpa conexões - use apenas se necessário
- **fix-*.js**: Scripts de correção - verifique antes de executar

## 🆘 Problemas?

Se um script falhar:
1. Verifique se está na pasta `back/`
2. Verifique se as dependências estão instaladas (`npm install`)
3. Verifique se o `.env` está configurado
4. Consulte [TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md)

---

💡 **Dica**: Para desenvolvimento, os mais úteis são `test-api.js` e `update-test-images.js`
