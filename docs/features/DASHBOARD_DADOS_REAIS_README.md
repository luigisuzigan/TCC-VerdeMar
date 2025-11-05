# 📊 Dashboard com Dados Reais - Sistema Completo

## ✅ O que foi implementado

### 🗄️ 1. Novos Modelos no Banco de Dados

Foram adicionados 4 novos modelos no Prisma Schema para rastrear dados reais:

#### **PropertyView** - Rastreamento de Visualizações
```prisma
model PropertyView {
  id         String   @id @default(uuid())
  propertyId String
  userId     String?  // Opcional - pode ser anônimo
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
}
```
- Registra **cada visualização** de imóvel
- Armazena IP e user-agent para análise
- Permite visualizações anônimas

#### **ContactMessage** - Sistema de Mensagens
```prisma
model ContactMessage {
  id          String    @id @default(uuid())
  name        String
  email       String
  phone       String?
  subject     String?
  message     String
  propertyId  String?
  status      String    @default("NEW")  // NEW, READ, REPLIED, ARCHIVED
  reply       String?
  repliedAt   DateTime?
  repliedBy   String?
  createdAt   DateTime  @default(now())
}
```
- Armazena mensagens de contato do site
- Sistema de status (nova/lida/respondida/arquivada)
- Possibilidade de responder mensagens

#### **ActivityLog** - Logs de Atividades
```prisma
model ActivityLog {
  id          String   @id @default(uuid())
  userId      String?
  action      String   // PROPERTY_CREATED, USER_REGISTERED, etc.
  entityType  String?
  entityId    String?
  metadata    String?  // JSON
  ipAddress   String?
  createdAt   DateTime @default(now())
}
```
- Registra todas as ações importantes do sistema
- Permite auditoria completa
- Metadata em JSON para flexibilidade

### 🔧 2. Backend - Novos Endpoints

#### **GET /api/dashboard/stats** - Estatísticas Completas
Retorna **TODOS os dados reais** do dashboard:

```javascript
{
  success: true,
  data: {
    // 📊 OVERVIEW - Visão geral
    overview: {
      totalProperties: 6,
      publishedProperties: 5,
      pendingProperties: 1,
      totalUsers: 12,
      activeUsers: 11,
      totalViews: 1247,
      totalFavorites: 34,
      totalReviews: 18,
      unreadMessages: 3
    },
    
    // 👥 USUÁRIOS POR ROLE
    usersByRole: [
      { role: "ADMIN", _count: 2 },
      { role: "SELLER", _count: 4 },
      { role: "USER", _count: 6 }
    ],
    
    // 📈 TENDÊNCIAS (últimos 7 dias)
    trends: {
      sales: [
        { date: "2025-10-14", label: "14/10", value: 2 },
        { date: "2025-10-15", label: "15/10", value: 1 },
        // ... 7 dias
      ],
      views: [
        { date: "2025-10-14", label: "14/10", value: 145 },
        // ...
      ],
      monthlySales: [
        { month: "Mai", value: 12 },
        { month: "Jun", value: 15 },
        // ... 6 meses
      ]
    },
    
    // 🏠 DISTRIBUIÇÕES
    distributions: {
      byType: [
        { type: "Apartamento", count: 3 },
        { type: "Casa", count: 2 },
        { type: "Chalé", count: 1 }
      ],
      byCity: [
        { city: "Florianópolis", count: 4 },
        { city: "Bombinhas", count: 2 }
      ],
      priceByRegion: [
        { city: "Florianópolis", avgPrice: 850000, count: 4 },
        { city: "Bombinhas", avgPrice: 1200000, count: 2 }
      ]
    },
    
    // 🏆 TOP PROPRIEDADES
    topProperties: {
      mostViewed: [ /* top 5 com viewCount real */ ],
      mostFavorited: [ /* top 5 com contagem de favoritos */ ],
      topRated: [ /* top 5 com melhor rating */ ]
    },
    
    // 💬 MENSAGENS
    messages: [ /* últimas 10 mensagens */ ],
    
    // 💰 FINANCEIRO
    financial: {
      averagePrice: 950000,
      minPrice: 350000,
      maxPrice: 2500000,
      totalValue: 5700000
    }
  }
}
```

#### **Middleware de Tracking Automático**
- **Toda vez** que alguém visualiza um imóvel (GET /api/properties/:id)
- Incrementa automaticamente o `viewCount`
- Registra na tabela `PropertyView`
- **Não afeta a performance** (operação assíncrona)

### 🎨 3. Frontend - Dashboard Renovado

O Dashboard foi **completamente reescrito** para usar apenas dados reais:

#### **Principais Mudanças:**

✅ **Sem dados simulados/mockados**
- Tudo vem da API `/dashboard/stats`
- Se não há dados, mostra "Nenhum dado disponível"

✅ **Gráficos com dados reais:**
1. **Tendência de Cadastros** (linha) - últimos 7 dias
2. **Tendência de Visualizações** (linha) - últimos 7 dias
3. **Cadastros Mensais** (linha) - últimos 6 meses
4. **Imóveis Mais Visualizados** (lista com ranking)
5. **Imóveis por Tipo** (pizza)
6. **Imóveis por Cidade** (lista top 5)
7. **Preço Médio por Cidade** (pizza + cards)

✅ **Sistema de Mensagens:**
- Lista mensagens reais do banco
- Status visual (Nova/Lida/Respondida)
- Botões de ação (Responder/Arquivar)
- Timestamp formatado ("Há X horas")

✅ **Cards de Estatísticas:**
- Total de Imóveis (publicados/rascunhos)
- Total de Usuários (ativos)
- Total de Visualizações
- Mensagens não lidas
- Favoritos
- Avaliações
- Preço Médio
- Imóveis Pendentes

✅ **Estatísticas Financeiras:**
- Valor total em imóveis
- Menor preço
- Maior preço

## 🚀 Como Testar

### 1. Atualizar o Banco de Dados

```bash
cd back
npx prisma db push
npx prisma generate
```

Isso criará as novas tabelas (PropertyView, ContactMessage, ActivityLog).

### 2. Iniciar o Backend

```bash
cd back
node src/index.js
```

O backend deve iniciar em `http://localhost:4000`

### 3. Testar o Endpoint de Estatísticas

```bash
# No navegador ou usando curl:
http://localhost:4000/api/dashboard/stats
```

Você verá todos os dados reais do banco.

### 4. Iniciar o Frontend

```bash
cd front
npm run dev
```

### 5. Acessar o Dashboard Admin

```
http://localhost:5173/admin/dashboard
```

**Login admin padrão:**
- Email: admin@verdemar.com
- Senha: admin123

### 6. Verificar Dados Reais

No dashboard você verá:
- ✅ Números reais de imóveis/usuários
- ✅ Gráficos com dados do banco
- ✅ Distribuições reais por tipo/cidade
- ✅ Preços médios calculados

## 📝 Como os Dados São Coletados

### Visualizações de Imóveis
**Quando um usuário visualiza um imóvel:**
1. Frontend faz GET /api/properties/:id
2. Backend executa middleware `trackPropertyView`
3. Incrementa `viewCount` na tabela Property
4. Cria registro na tabela PropertyView
5. Dados ficam disponíveis para o dashboard

### Favoritos
**Quando um usuário favorita:**
1. Cria registro na tabela Favorite
2. Dashboard conta total de favoritos
3. Ranking de imóveis mais favoritados

### Avaliações
**Quando um usuário avalia:**
1. Cria registro na tabela Review
2. Dashboard calcula médias
3. Ranking de imóveis melhor avaliados

### Mensagens
**Quando alguém envia mensagem:**
1. Cria registro na tabela ContactMessage
2. Status inicial: "NEW"
3. Dashboard lista mensagens não lidas
4. Admin pode responder/arquivar

## 🎯 Próximos Passos

### Backend
- [ ] Criar endpoint POST /api/messages/:id/reply (responder mensagem)
- [ ] Criar endpoint PATCH /api/messages/:id/status (mudar status)
- [ ] Implementar sistema de notificações em tempo real (WebSocket)
- [ ] Adicionar filtros por data no endpoint /dashboard/stats

### Frontend
- [ ] Implementar funcionalidade de responder mensagens
- [ ] Adicionar modal para visualizar mensagem completa
- [ ] Implementar filtros de data nos gráficos
- [ ] Adicionar exportação de relatórios (PDF/Excel)
- [ ] Implementar refresh automático dos dados

### Analytics Avançado
- [ ] Rastrear origem do tráfego (Google, Facebook, direto)
- [ ] Implementar funil de conversão
- [ ] Rastrear tempo médio de visualização
- [ ] Heatmaps de cliques
- [ ] Taxa de retorno de usuários

## 📊 Estrutura de Dados

### Como adicionar dados de teste

Para popular o banco com dados realistas:

```bash
cd back
node src/scripts/seedProperties.js
```

Isso criará:
- ✅ Imóveis com dados completos
- ✅ Usuários de teste
- ✅ Algumas visualizações simuladas

### Como criar mensagens de teste manualmente

```javascript
// Via Prisma Studio ou console
await prisma.contactMessage.create({
  data: {
    name: "João Silva",
    email: "joao@email.com",
    phone: "(48) 99999-9999",
    subject: "Interesse em imóvel",
    message: "Gostaria de mais informações sobre o apartamento.",
    status: "NEW"
  }
});
```

## 🔒 Segurança

- ✅ Endpoint /dashboard/stats deve ter autenticação admin
- ✅ Validar entrada de dados nas mensagens
- ✅ Sanitizar HTML em mensagens para evitar XSS
- ✅ Rate limiting para evitar spam de visualizações

## 💡 Dicas

1. **Visualizações duplicadas:** O sistema registra toda visualização. Para evitar contagem duplicada do mesmo usuário, você pode adicionar lógica para verificar última visualização por IP/userId.

2. **Performance:** Com muitos dados, considere:
   - Pagination nas mensagens
   - Cache dos dados do dashboard (5-10 minutos)
   - Índices no banco para queries rápidas

3. **Testes:** Abra o site em modo anônimo e navegue pelos imóveis. Depois, verifique no dashboard se as visualizações foram registradas.

## 🐛 Troubleshooting

### Dashboard mostra "0" em tudo
- Verifique se o backend está rodando
- Teste o endpoint /dashboard/stats diretamente
- Verifique se há dados no banco (npx prisma studio)

### Visualizações não incrementam
- Verifique se a tabela PropertyView foi criada
- Veja os logs do backend ao acessar um imóvel
- Confirme que o middleware está sendo executado

### Gráficos vazios
- Normal se não há dados dos últimos 7 dias
- Crie alguns imóveis/usuários recentes
- Ou ajuste o período de análise

---

**Documentação completa.** Todos os dados agora são reais e vêm do banco de dados! 🎉
