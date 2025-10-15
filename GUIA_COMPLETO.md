# 📘 VerdeMar - Guia Completo do Projeto

> **Documentação única e completa** - Tudo que você precisa saber está aqui!

---

## 📑 Índice

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Instalação e Configuração](#instalacao-e-configuracao)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Google Maps - Configuração](#google-maps)
5. [Cards e Navegação](#cards-e-navegacao)
6. [Página PropertyDetails](#property-details)
7. [Backend e API](#backend-e-api)
8. [Comandos Úteis](#comandos-uteis)
9. [Troubleshooting](#troubleshooting)

---

## 🏠 Sobre o Projeto

**VerdeMar** é uma plataforma de anúncios imobiliários moderna, focada em propriedades litorâneas em Santa Catarina.

### Tecnologias Principais

**Frontend:**
- React 18
- React Router Dom 7
- Tailwind CSS 4
- Vite 6
- Axios
- Lucide React (ícones)
- Framer Motion (animações)
- @react-google-maps/api

**Backend:**
- Node.js + Express
- Prisma ORM
- SQLite
- JWT para autenticação

---

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/uKleitin/TCC-VerdeMar.git
cd TCC-VerdeMar
```

### 2. Instalar Dependências

#### Backend
```bash
cd back
npm install
```

#### Frontend
```bash
cd front
npm install
```

### 3. Configurar Variáveis de Ambiente

#### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

#### Frontend (.env)
```env
# Google Maps API Key (opcional mas recomendado)
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### 4. Iniciar o Banco de Dados

```bash
cd back
npx prisma migrate dev
npx prisma db seed
```

### 5. Rodar o Projeto

#### Terminal 1 - Backend
```bash
cd back
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd front
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📂 Estrutura do Projeto

```
TCC-VerdeMar/
├── back/                       # Backend (API)
│   ├── prisma/
│   │   ├── schema.prisma      # Schema do banco
│   │   └── migrations/        # Migrações
│   ├── src/
│   │   ├── index.js           # Servidor principal
│   │   ├── auth/              # Autenticação
│   │   ├── users/             # Rotas de usuários
│   │   ├── properties/        # Rotas de imóveis
│   │   └── scripts/           # Scripts úteis
│   └── package.json
│
├── front/                      # Frontend (React)
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js      # Configuração Axios
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── Home/          # Componentes da Home
│   │   │   ├── Explorar/      # Componentes do Explorar
│   │   │   ├── Search/        # Sistema de busca
│   │   │   └── layout/        # Header, Footer
│   │   ├── pages/             # Páginas
│   │   │   ├── Home/
│   │   │   ├── Explorar/
│   │   │   ├── PropertyDetails/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Account/
│   │   │   ├── Seller/
│   │   │   └── Admin/
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx  # Configuração de rotas
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Contexto de autenticação
│   │   ├── utils/             # Funções auxiliares
│   │   └── styles/            # CSS global
│   └── package.json
│
└── GUIA_COMPLETO.md           # Este arquivo
```

---

## 🗺️ Google Maps - Configuração

### Por que usar Google Maps?

- ✅ Autocomplete de endereços em tempo real
- ✅ Mapa interativo profissional
- ✅ Geocoding automático
- ✅ Gratuito para uso normal ($200 crédito/mês)

### Como Configurar

#### 1. Obter API Key (5 minutos)

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto (ex: "VerdeMar")
3. Vá em **APIs e Serviços** → **Biblioteca**
4. Ative estas 3 APIs:
   - ✅ Maps JavaScript API
   - ✅ Places API
   - ✅ Geocoding API
5. Vá em **Credenciais** → **+ CRIAR CREDENCIAIS** → **Chave de API**
6. Copie a chave gerada

**IMPORTANTE**: Você cria **UMA CHAVE** que funciona para as 3 APIs! Não crie 3 chaves separadas.

#### 2. Adicionar no Projeto

Edite `front/.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB1234...sua_chave_aqui
```

#### 3. Reiniciar o Servidor

```bash
# Pressione Ctrl+C para parar
npm run dev
```

### Restringir a Chave (Segurança)

1. No Google Cloud, clique na chave criada
2. **Restrições de aplicativo**:
   - Tipo: Referenciadores HTTP (sites)
   - Domínios: 
     - `http://localhost:5173/*`
     - `https://seudominio.com/*`
3. **Restrições de API**:
   - Marque as 3 APIs ativadas
4. Salvar

### Custo

**GRÁTIS** para uso normal!
- Google oferece $200/mês de crédito
- Você provavelmente usará menos de $10/mês
- Praticamente gratuito para sites pequenos/médios

### Implementação no Código

O Google Maps é usado em:
- `LocationModal.jsx` - Busca de localização com autocomplete
- Usa `useLoadScript` para carregar a biblioteca uma vez
- Fallback amigável se não tiver API Key

---

## 🎴 Cards e Navegação

### Cards com Links

Todos os cards de imóveis redirecionam para PropertyDetails:

#### 1. PropertyCard (Explorar)
```jsx
<Link to={`/property/${property.id}`}>
  <PropertyCard property={property} />
</Link>
```

#### 2. PropertyCard (Home - Section3)
```jsx
<Link to={`/property/${id}`}>
  Ver detalhes
</Link>
```

#### 3. CondoCard (Home - Carrossel)
```jsx
<Link to={`/property/${id}`}>
  <CondoCard condo={condo} />
</Link>
```

#### 4. TravelCard (Home - Section4)
```jsx
<Link to={`/property/${item.id}`}>
  <TravelCard item={item} />
</Link>
```

### Requisitos dos Dados

Todos os objetos precisam ter `id`:

```javascript
// Exemplo
{
  id: 1,              // ← OBRIGATÓRIO
  title: "Casa",
  price: 450000,
  // ... outros campos
}
```

---

## 🏠 Página PropertyDetails

### Recursos Implementados

#### 📸 Galeria de Fotos
- Grid responsivo de 5 imagens
- Modal em tela cheia
- Navegação com setas
- Contador de fotos
- Botão "Ver todas as X fotos"

#### 💰 Card de Preço
- Preço em destaque
- Botões:
  - "Entrar em contato"
  - "Agendar visita"
- Informações rápidas
- Banner de segurança

#### 🏗️ Características
Cards coloridos:
- 📏 Área (verde)
- 🛏️ Quartos (azul)
- 🚿 Banheiros (roxo)
- 🚗 Vagas (laranja)

#### ✨ Interatividade
- ❤️ Favoritar
- 🔗 Compartilhar
- ↩️ Voltar
- 🖼️ Modal de galeria

#### 📋 Conteúdo
- Descrição completa
- Comodidades com checkmarks
- Avaliações com estrelas
- Badge do tipo
- Seção "Similares"

### Estados da Página
- **Loading**: Spinner animado
- **Erro**: Card com botão voltar
- **Sem imagens**: Placeholder
- **Sucesso**: Layout completo

### Estrutura de Dados Esperada

```javascript
{
  id: 1,
  title: "Apartamento Moderno",
  type: "apartamento",
  description: "Descrição...",
  price: 450000,
  address: "Rua das Flores, 123",
  city: "Florianópolis",
  state: "SC",
  area: 85,
  beds: 2,
  baths: 1,
  parkingSpaces: 1,
  images: ["url1.jpg", "url2.jpg"],
  rating: 4.5,
  reviews: 120,
  amenities: ["Wi-Fi", "Piscina", "Academia"]
}
```

---

## 🔧 Backend e API

### Endpoints Principais

#### Properties (Imóveis)
```
GET    /properties              # Listar todos (com filtros)
GET    /properties/:id          # Detalhes de um imóvel
POST   /properties              # Criar (requer auth)
PUT    /properties/:id          # Atualizar (requer auth)
DELETE /properties/:id          # Deletar (requer auth)
```

#### Users (Usuários)
```
POST   /auth/register           # Registrar
POST   /auth/login              # Login
GET    /users/me                # Perfil (requer auth)
PUT    /users/me                # Atualizar perfil
```

### Filtros de Busca

Query params para `/properties`:

```
?city=Florianópolis
&minPrice=100000
&maxPrice=500000
&minArea=50
&maxArea=150
&types=apartamento,casa
&minBedrooms=2
&minBathrooms=1
&minParkingSpaces=1
&published=true
&limit=24
&offset=0
```

### Autenticação

#### Header necessário:
```
Authorization: Bearer {token}
```

#### Obtendo token:
```javascript
const { data } = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'senha123'
});
const token = data.token;
```

### Roles (Papéis)
- `USER` - Usuário comum
- `SELLER` - Anunciante (pode criar imóveis)
- `ADMIN` - Administrador (acesso total)

---

## ⌨️ Comandos Úteis

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

### Backend

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Prisma
npx prisma studio          # Interface visual do DB
npx prisma migrate dev     # Criar migração
npx prisma db seed         # Popular banco
npx prisma generate        # Gerar cliente
```

### Git

```bash
# Status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "mensagem"

# Push
git push origin main

# Pull
git pull origin main
```

### Scripts Úteis (Backend)

```bash
# Criar usuário admin
node src/scripts/createAdmin.js

# Listar usuários
node src/scripts/listUsers.js

# Popular imóveis de exemplo
node src/scripts/seedProperties.js

# Verificar imóveis
node src/scripts/checkProperties.js
```

---

## 🐛 Troubleshooting

### Frontend não conecta com Backend

**Problema:** Erro CORS ou conexão recusada

**Solução:**
1. Verifique se o backend está rodando (`http://localhost:3000`)
2. Confira `front/src/api/client.js`:
   ```javascript
   baseURL: 'http://localhost:3000'
   ```

### Google Maps não aparece

**Problema:** Mapa mostra mensagem de configuração

**Solução:**
1. Verifique se a API Key está no `.env`
2. Reinicie o servidor (Ctrl+C e `npm run dev`)
3. Veja o console do navegador (F12)

**Problema:** "This API project is not authorized"

**Solução:**
1. Ative as 3 APIs no Google Cloud
2. Aguarde alguns minutos

**Problema:** Erros de elementos duplicados (gmp-internal-*)

**Solução:**
- Já corrigido! Usamos `useLoadScript` ao invés de `LoadScript` múltiplos

### PropertyDetails mostra erro

**Problema:** "Imóvel não encontrado"

**Solução:**
1. Verifique se o backend está rodando
2. Teste a API: `http://localhost:3000/properties/{id}`
3. Veja se o ID existe no banco

**Problema:** "property.amenities.map is not a function"

**Solução:**
- Já corrigido! O código agora verifica se `amenities` é um array
- Se o erro persistir, limpe o cache do navegador (Ctrl+Shift+Del)

### Cards não redirecionam

**Problema:** Clica mas não vai para PropertyDetails

**Solução:**
1. Verifique se os dados têm campo `id`
2. Veja o console para erros
3. Confira se a rota `/property/:id` existe

### Banco de dados vazio

**Problema:** Nenhum imóvel aparece

**Solução:**
```bash
cd back
npx prisma db seed
```

### Erro ao fazer login

**Problema:** "Invalid credentials"

**Solução:**
1. Verifique email/senha
2. Crie novo usuário pelo Register
3. Ou use script: `node src/scripts/createAdmin.js`

### Tailwind CSS não funciona

**Problema:** Classes não aplicam estilo

**Solução:**
1. Reinicie o servidor
2. Limpe cache: Deletar `.vite` e `node_modules/.vite`
3. `npm install` novamente

### Terminal mostra erro com && (PowerShell)

**Problema:** Comandos com `&&` não funcionam

**Solução:**
- O VS Code já está configurado para usar Command Prompt (cmd.exe) por padrão
- Se não estiver, vá em Terminal → Select Default Profile → Command Prompt

---

## 📝 Boas Práticas

### Commits

Use mensagens descritivas:
```bash
git commit -m "feat: adiciona filtro por preço"
git commit -m "fix: corrige erro no login"
git commit -m "style: melhora layout da home"
```

### Branches

```bash
# Criar branch para nova feature
git checkout -b feature/nome-da-feature

# Voltar para main
git checkout main

# Merge da feature
git merge feature/nome-da-feature
```

### Segurança

**NUNCA commite:**
- ❌ Arquivos `.env`
- ❌ API Keys
- ❌ Senhas
- ❌ `node_modules/`
- ❌ Bancos de dados

**O `.gitignore` já protege isso!**

---

## 🎯 Próximos Passos

### Features Planejadas

- [ ] Sistema de favoritos persistente
- [ ] Chat entre usuário e anunciante
- [ ] Tour virtual 360°
- [ ] Mapa na página de detalhes
- [ ] Filtros avançados (piscina, churrasqueira, etc)
- [ ] Sistema de avaliações
- [ ] Upload de múltiplas imagens
- [ ] Pagamento integrado
- [ ] Notificações por email
- [ ] App mobile (React Native)

### Melhorias Técnicas

- [ ] Testes automatizados (Jest/Vitest)
- [ ] CI/CD (GitHub Actions)
- [ ] Deploy automático (Vercel/Railway)
- [ ] CDN para imagens
- [ ] Cache de dados
- [ ] SEO otimizado
- [ ] PWA (Progressive Web App)
- [ ] Logs estruturados
- [ ] Monitoramento de erros (Sentry)

---

## 📞 Suporte

### Documentação Oficial

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Prisma](https://www.prisma.io/docs)
- [Google Maps API](https://developers.google.com/maps)

### Recursos Úteis

- [Lucide Icons](https://lucide.dev/) - Ícones usados
- [Tailwind Components](https://tailwindui.com/) - Componentes
- [Hero Icons](https://heroicons.com/) - Mais ícones

---

## ✅ Checklist de Desenvolvimento

### Setup Inicial
- [x] Instalar dependências (front + back)
- [x] Configurar banco de dados
- [x] Popular dados de exemplo
- [x] Testar backend (Postman/Thunder Client)
- [x] Testar frontend (navegador)

### Google Maps
- [ ] Criar projeto no Google Cloud
- [ ] Ativar as 3 APIs
- [ ] Gerar API Key
- [ ] Adicionar no `.env`
- [ ] Restringir a chave
- [ ] Testar autocomplete

### Deploy
- [ ] Build do frontend (`npm run build`)
- [ ] Configurar variáveis de ambiente
- [ ] Subir backend (Railway/Render)
- [ ] Subir frontend (Vercel/Netlify)
- [ ] Configurar domínio
- [ ] SSL/HTTPS

---

## 🎉 Conclusão

Agora você tem **TUDO** que precisa saber sobre o projeto VerdeMar em um único lugar!

**Problemas?** Consulte a seção [Troubleshooting](#troubleshooting)

**Dúvidas sobre APIs?** Veja [Backend e API](#backend-e-api)

**Google Maps?** Consulte [Google Maps - Configuração](#google-maps)

---

**Desenvolvido com ❤️ para VerdeMar**  
**Última atualização:** 14/10/2025
