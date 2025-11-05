# 🏖️ VerdeMar - Plataforma de Imóveis

Sistema completo de gerenciamento e busca de imóveis com filtros avançados, mapa interativo e painel administrativo.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação Rápida](#instalação-rápida)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Scripts Úteis](#scripts-úteis)

## 📚 Documentação Completa

**🎯 Leia o [GUIA_COMPLETO.md](./docs/GUIA_COMPLETO.md)** - Toda a documentação do projeto está lá!

## 🎯 Sobre o Projeto

VerdeMar é uma plataforma moderna de imóveis desenvolvida para facilitar a busca, visualização e gerenciamento de propriedades. O sistema oferece:

- ✨ **Busca inteligente** com múltiplos filtros
- 🗺️ **Mapa interativo** com desenho de áreas
- 📊 **Painel administrativo** completo
- ⭐ **Sistema de favoritos** e avaliações
- 🏢 **Integração com Google Maps**
- 📱 **Design responsivo** e moderno

## ✨ Funcionalidades Principais

### Para Usuários
- 🔍 Busca avançada (preço, localização, tipo, quartos, etc.)
- 🗺️ Mapa interativo com desenho de áreas de interesse
- ⭐ Sistema de favoritos
- 📱 Interface responsiva
- 🏆 Avaliações e ratings

### Para Administradores
- � Dashboard com estatísticas
- ➕ CRUD completo de imóveis
- 👥 Gestão de usuários
- 📸 Upload e gerenciamento de imagens
- 🎨 Sistema de categorização

## 🚀 Instalação Rápida

### Opção 1: Usando Scripts Automáticos (Recomendado para Windows)

```bash
# 1. Instalar dependências do Backend
cd back
npm install

# 2. Gerar Prisma Client (OBRIGATÓRIO - só precisa fazer 1x)
node node_modules\prisma\build\index.js generate

# 3. Popular banco com dados iniciais (opcional - só 1x)
node quick-seed.js

# 4. Iniciar o servidor (duplo clique ou via terminal)
start-backend.bat

# 5. Frontend (novo terminal)
cd ..\front
npm install
npm run dev
```

### Opção 2: Usando NPM (Se npx estiver habilitado)

```bash
# 1. Backend
cd back
npm install

# 2. Gerar Prisma Client (OBRIGATÓRIO)
npx prisma generate

# 3. Popular banco (opcional)
npm run seed

# 4. Iniciar servidor
npm run seed

# 5. Frontend (novo terminal)
cd front
npm install
npm run dev
```

### ⚠️ Passos Importantes

1. **Prisma Client**: SEMPRE execute `npx prisma generate` ou `node node_modules\prisma\build\index.js generate` após instalar dependências
2. **Banco de dados**: O projeto usa MySQL na nuvem (já configurado no `.env`)
3. **Seed**: Execute apenas 1x para popular dados iniciais
4. **Google Maps API**: Configure para mostrar locais próximos - veja [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md)
5. **PowerShell**: Se encontrar erro de execução de scripts, use `node` diretamente ou CMD ao invés de PowerShell

Acesse: **http://localhost:5173**

## 📁 Estrutura do Projeto

```
TCC-VerdeMar/
├── back/                    # Backend (API)
│   ├── src/                 # Código fonte
│   │   ├── auth/            # Autenticação
│   │   ├── properties/      # Lógica de imóveis
│   │   ├── users/           # Gestão de usuários
│   │   └── dashboard/       # Estatísticas
│   ├── prisma/              # Schema e migrações
│   ├── scripts/             # Scripts utilitários
│   ├── docs/                # Documentação backend
│   └── start.bat            # Iniciar backend
│
├── front/                   # Frontend (React)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── api/             # Cliente HTTP
│   │   └── utils/           # Utilitários
│   └── public/Teste/        # Imagens de teste
│
├── docs/                    # Documentação geral
│   ├── setup/               # Guias de setup
│   ├── features/            # Features
│   └── testing/             # Testes
│
└── Tutoriais/              # Tutoriais técnicos
```

## 📚 Documentação

### 🚀 Getting Started
- [Quick Start (Backend)](back/docs/QUICK_START.md)
- [Setup Completo](back/docs/SETUP.md)
- [Google Maps Setup](docs/setup/GOOGLE_MAPS_SETUP.md)
- [Deploy Vercel](docs/setup/DEPLOY_VERCEL.md)

### � Referências
- [Property Parameters](back/docs/PROPERTY_PARAMETERS.md)
- [Amenities & Conditions](back/docs/AMENITIES_AND_CONDITIONS.md)
- [Users API](back/docs/USERS_API.md)
- [Style System](back/docs/STYLE_SYSTEM_README.md)

### 🎨 Features
- [Sistema de Filtros](docs/features/FILTROS_ATIVOS_README.md)
- [Dashboard](docs/features/DASHBOARD_DADOS_REAIS_README.md)

### 🐛 Troubleshooting
- [Guia de Solução de Problemas](docs/TROUBLESHOOTING.md)

## 🛠️ Scripts Úteis

### Backend
```bash
npm run dev          # Desenvolvimento
npm run seed         # Popular banco
npm run db:push      # Sync schema
```

**Scripts de Manutenção** (`back/scripts/`):
- `test-api.js` - Testar API
- `check-coords.js` - Verificar coordenadas
- `update-test-images.js` - Atualizar imagens de teste

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
```

## � Credenciais de Teste

**Admin**
- Email: `admin@verdemar.com`
- Senha: `admin123`

## 🎨 Tecnologias

### Backend
- Node.js + Express
- Prisma ORM + MySQL
- JWT + Bcrypt
- Google Maps API

### Frontend
- React 18 + Vite
- TailwindCSS
- React Router
- Axios

## ⚠️ Problemas Comuns

### PowerShell - Erro de execução de scripts
Se encontrar erro ao executar `.bat`, use CMD ou:
```bash
node src/index.js  # Ao invés de start.bat
```

### Prisma Client não encontrado
```bash
cd back
npx prisma generate
# ou
node node_modules\prisma\build\index.js generate
```

### Mais problemas?
Veja: [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## � Licença

Trabalho de Conclusão de Curso (TCC)

## 👨‍💻 Autores

- Luigi Suzigan
- Samuel Suzigan

---

💡 **Dica**: Para documentação completa, consulte [GUIA_COMPLETO.md](docs/GUIA_COMPLETO.md)

- Tailwind CSS 4
- React Router Dom 7
- @react-google-maps/api
- Axios + Lucide Icons

### Backend
- Node.js + Express
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT Authentication

## 📖 Documentação

- **[GUIA_COMPLETO.md](./GUIA_COMPLETO.md)** - Documentação completa e oficial
- `Tutoriais/` - Guias técnicos específicos (backend, testes, etc.)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 License

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Igreja Pleno - uKleitin**

---

**📘 Leia o [GUIA_COMPLETO.md](./GUIA_COMPLETO.md) para todos os detalhes!**
