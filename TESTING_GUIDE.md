# 🧪 Guia de Teste - Sistema de Busca

## 🚀 Como Testar

### 1️⃣ Criar Imóveis de Teste

```bash
cd back
node src\scripts\seedProperties.js
```

Isso criará 6 imóveis em Florianópolis com diferentes características.

### 2️⃣ Iniciar o Backend

```bash
cd back
npm run dev
```

O servidor deve estar rodando em `http://localhost:3000`

### 3️⃣ Iniciar o Frontend

```bash
cd front
npm run dev
```

O app deve estar rodando em `http://localhost:5173`

---

## 📋 Checklist de Testes

### ✅ Home Page

1. **Acessar** `http://localhost:5173`
2. **Verificar** QuickSearch aparece
3. **Clicar** em cada modal (Tipo, Local, Preço, Área, Mais Filtros)
4. **Selecionar** alguns filtros
5. **Clicar** em "Buscar"
6. **Verificar** redirecionamento para `/explorar`

### ✅ Página Explorar

#### Desktop
1. **Acessar** `http://localhost:5173/explorar`
2. **Verificar** 6 imóveis aparecem em grid de 3 colunas
3. **Verificar** sidebar de filtros à esquerda
4. **Clicar** em filtros diferentes
5. **Verificar** URL atualiza
6. **Verificar** filtros ativos aparecem no topo
7. **Testar** ordenação (preço crescente/decrescente)
8. **Clicar** em "Limpar todos"

#### Mobile (Redimensionar navegador < 1024px)
1. **Redimensionar** navegador para mobile
2. **Verificar** sidebar some
3. **Verificar** botão flutuante verde aparece
4. **Clicar** no botão
5. **Verificar** modal abre de baixo para cima
6. **Aplicar** filtros
7. **Verificar** badge de contagem

### ✅ Cards de Imóveis

1. **Hover** sobre um card
2. **Verificar** sombra aumenta
3. **Verificar** imagem faz zoom suave
4. **Clicar** no card
5. **Verificar** navegação para `/property/:id`

### ✅ Página de Detalhes

1. **Verificar** título do imóvel
2. **Verificar** imagens aparecem
3. **Verificar** preço formatado
4. **Verificar** características (quartos, banheiros, área)
5. **Verificar** localização

---

## 🎯 Cenários de Teste Específicos

### Cenário 1: Buscar Casas em Florianópolis

1. Home → QuickSearch
2. Tipo do Imóvel → Selecionar "Casa"
3. Local → Digitar "Florianópolis"
4. Buscar
5. **Resultado**: Deve mostrar 3 casas

### Cenário 2: Filtrar por Preço

1. Explorar → Sidebar
2. Price Range → Selecionar "$1.000 - $15.000"
3. **Resultado**: Deve mostrar apartamento de R$ 980.000

### Cenário 3: Busca Avançada

1. Home → QuickSearch
2. Mais Filtros
3. Selecionar:
   - Quartos: 4+
   - Banheiros: 3+
   - Comodidades: Piscina, Vista mar
4. Aplicar Filtros
5. Buscar
6. **Resultado**: Deve mostrar 2-3 imóveis

### Cenário 4: Ordenação

1. Explorar
2. Dropdown "Ordenar por"
3. Selecionar "Menor preço"
4. **Resultado**: Kitnet (R$ 350.000) deve aparecer primeiro

### Cenário 5: Remover Filtros

1. Aplicar vários filtros
2. Verificar pills de filtros ativos
3. Clicar no X de um filtro
4. **Resultado**: Filtro removido e resultados atualizados

---

## 🔍 URLs para Testar Diretamente

### Imóveis Específicos (pegue ID do console após seed)
```
http://localhost:5173/property/[ID-DO-IMOVEL]
```

### Busca com Filtros
```
http://localhost:5173/explorar?types=casa&city=Florianópolis&priceMin=500000&priceMax=2000000
```

### Busca por Tipo
```
http://localhost:5173/explorar?types=casa
http://localhost:5173/explorar?types=apartamento
http://localhost:5173/explorar?types=cobertura
```

### Busca por Faixa de Preço
```
http://localhost:5173/explorar?priceMax=1000000
http://localhost:5173/explorar?priceMin=1000000&priceMax=2000000
http://localhost:5173/explorar?priceMin=2000000
```

---

## 🐛 Problemas Comuns

### Imóveis não aparecem
- ✅ Verificar se o seed foi executado
- ✅ Verificar se o backend está rodando
- ✅ Abrir console do navegador (F12) e verificar erros
- ✅ Verificar Network tab se a chamada `/properties` retorna dados

### Imagens não carregam
- ✅ Verificar se as imagens existem em `front/public/Teste/`
- ✅ Verificar console para erros 404
- ✅ Path das imagens deve ser `/Teste/Imóvel1.jpg` (relativo ao public)

### Filtros não funcionam
- ✅ Verificar console do navegador
- ✅ Verificar se URL está atualizando
- ✅ Verificar se backend recebe os parâmetros corretos

### Erro de conexão com banco
- ✅ Verificar se MySQL está rodando
- ✅ Verificar arquivo `.env` no back
- ✅ Executar `npx prisma generate` no back

---

## 📊 Dados de Teste Disponíveis

Após executar o seed, você terá:

| Tipo | Qtd | Preço Mín | Preço Máx |
|------|-----|-----------|-----------|
| Casa | 3 | R$ 750.000 | R$ 1.850.000 |
| Apartamento | 1 | R$ 980.000 | R$ 980.000 |
| Cobertura | 1 | R$ 3.200.000 | R$ 3.200.000 |
| Kitnet | 1 | R$ 350.000 | R$ 350.000 |

### Características
- **Área**: 45m² até 350m²
- **Quartos**: 1 até 4
- **Banheiros**: 1 até 5
- **Todos** em Florianópolis, SC
- **Todos** publicados
- **3** marcados como destaque

---

## ✅ Teste Final Completo

Execute este fluxo completo:

1. ✅ Criar imóveis de teste (seed)
2. ✅ Iniciar backend
3. ✅ Iniciar frontend
4. ✅ Acessar home
5. ✅ Usar QuickSearch para buscar "Casa em Florianópolis"
6. ✅ Ver resultados na página Explorar
7. ✅ Aplicar filtro de preço
8. ✅ Ordenar por preço crescente
9. ✅ Clicar em um imóvel
10. ✅ Ver detalhes completos
11. ✅ Voltar para explorar
12. ✅ Testar versão mobile (redimensionar)
13. ✅ Abrir modal de filtros mobile
14. ✅ Aplicar novos filtros
15. ✅ Limpar todos os filtros

**Se tudo funcionar**: ✅ Sistema pronto! 🎉

---

## 📝 Próximos Passos Após Testes

1. **Ajustar** backend para suportar todos os filtros avançados
2. **Implementar** paginação
3. **Adicionar** mais imóveis de teste
4. **Integrar** Google Maps
5. **Implementar** sistema de favoritos
6. **Adicionar** reviews/avaliações
